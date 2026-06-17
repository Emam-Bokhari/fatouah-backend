import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import stripe from './config/stripe';
import {
  createConnectLink,
  stripeWebhookController,
} from './app/modules/payment/payment.controller';
import auth from './app/middlewares/auth';
import { USER_ROLES } from './enums/user';
const app = express();
import path from 'path';
import { Delivery } from './app/modules/delivery/delivery.model';
import { notifyNearestRiders } from './app/modules/delivery/delivery.service';

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookController,
);

//morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//file retrieve
app.use(express.static('uploads'));

//router
app.use('/api/v1', router);

// connect stripe account
app.post(
  '/api/v1/stripe/create-connect-link',
  auth(USER_ROLES.RIDER),
  createConnectLink,
);

setInterval(async () => {
  try {
    const deliveries = await Delivery.find({
      status: 'REQUESTED',
      notified: { $ne: true }
    });

    for (const d of deliveries) {
      try {
        await notifyNearestRiders(d._id.toString());

        // Only mark as notified if it's still REQUESTED (in case notifyNearestRiders already marked it)
        const currentDelivery = await Delivery.findById(d._id);
        if (currentDelivery && !currentDelivery.notified) {
          await Delivery.updateOne(
            { _id: d._id },
            { $set: { notified: true } }
          );
        }
      } catch (err) {
        console.error(`Error processing delivery ${d._id}:`, err);
        // Mark as notified even if there's an error, so it doesn't keep getting processed
        await Delivery.updateOne(
          { _id: d._id },
          { $set: { notified: true } }
        );
      }
    }
    
    // Also, let's mark any deliveries that are no longer REQUESTED as notified
    await Delivery.updateMany(
      { 
        status: { $ne: 'REQUESTED' }, 
        notified: { $ne: true } 
      },
      { $set: { notified: true } }
    );
  } catch (err) {
    console.error("Error in delivery notification interval:", err);
  }
}, 3000);

// Express.js route
app.get('/stripe/success', (req, res) => {
  res.send('<h1>Stripe Onboarding Complete!</h1><p>Successfully connected your stripe accounts</p>');
});


app.get('/check-balance', async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();

    console.log('🟢 Available Balance:', balance.available);
    console.log('🟡 Pending Balance:', balance.pending);

    return res.status(200).json({
      success: true,
      available: balance.available,
      pending: balance.pending,
    });
  } catch (error: any) {
    console.error('🔴 Error retrieving balance:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve balance.',
      error: error.message,
    });
  }
});

//live response
app.get('/', (req: Request, res: Response) => {
  const date = new Date(Date.now());
  res.send(
    `<h1 style="text-align:center; color:#173616; font-family:Verdana;">Beep-beep! The server is alive and kicking.Project Fatouah</h1>
    <p style="text-align:center; color:#173616; font-family:Verdana;">${date}</p>
    `,
  );
});

//global error handle
app.use(globalErrorHandler);

//handle not found route;
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
