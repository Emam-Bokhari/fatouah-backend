// import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

// const createAccount = (values: ICreateAccount) => {
//   const data = {
//     to: values.email,
//     subject: 'Verify your account',
//     html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
//     <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//         <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
//           <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px;">Hey! ${values.name}, Your Toothlens Account Credentials</h2>
//         <div style="text-align: center;">
//             <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
//             <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
//             <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
//         </div>
//     </div>
// </body>`,
//   };
//   return data;
// };

// const resetPassword = (values: IResetPassword) => {
//   const data = {
//     to: values.email,
//     subject: 'Reset your password',
//     html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
//     <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//         <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
//         <div style="text-align: center;">
//             <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
//             <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
//             <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
//                 <p style="color: #b9b4b4; font-size: 16px; line-height: 1.5; margin-bottom: 20px;text-align:left">If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
//         </div>
//     </div>
// </body>`,
//   };
//   return data;
// };

// export const emailTemplate = {
//   createAccount,
//   resetPassword,
// };
import { ICreateAccount, IResetPassword } from "../types/emailTamplate";

const createAccount = (values: ICreateAccount) => {
  return {
    to: values.email,
    subject: "Verify Your Account",
    html: `
      <body style="margin:0;padding:30px;background-color:#FEFEFE;font-family:Arial,Helvetica,sans-serif;color:#333333;">
        <div style="max-width:600px;margin:0 auto;background:#FEFEFE;border:1px solid #EAEAEA;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <div style="background:#30923D;padding:30px;text-align:center;">
            <h1 style="margin:0;color:#FFFFFF;font-size:30px;font-weight:700;">
              Fatouah
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:40px 30px;">
            <h2 style="margin:0 0 20px;color:#333333;font-size:24px;">
              Welcome, ${values.name}
            </h2>

            <p style="font-size:16px;line-height:1.7;color:#555555;margin-bottom:25px;">
              Thank you for creating your account with Fatouah.
              To complete your registration, please use the verification code below.
            </p>

            <div style="text-align:center;margin:35px 0;">
              <div style="
                display:inline-block;
                background:#30923D;
                color:#FFFFFF;
                padding:16px 32px;
                border-radius:10px;
                font-size:32px;
                font-weight:700;
                letter-spacing:6px;
              ">
                ${values.otp}
              </div>
            </div>

            <p style="font-size:15px;color:#666666;line-height:1.7;">
              This verification code is valid for
              <strong>3 minutes</strong>.
            </p>

            <p style="font-size:15px;color:#666666;line-height:1.7;">
              If you did not create an account, you can safely ignore this email.
            </p>
          </div>

          <!-- Footer -->
          <div style="
            border-top:1px solid #EEEEEE;
            padding:20px;
            text-align:center;
            color:#888888;
            font-size:13px;
          ">
            © ${new Date().getFullYear()} Fatouah. All rights reserved.
          </div>

        </div>
      </body>
    `,
  };
};

const resetPassword = (values: IResetPassword) => {
  return {
    to: values.email,
    subject: "Reset Your Password",
    html: `
      <body style="margin:0;padding:30px;background-color:#FEFEFE;font-family:Arial,Helvetica,sans-serif;color:#333333;">
        <div style="max-width:600px;margin:0 auto;background:#FEFEFE;border:1px solid #EAEAEA;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <div style="background:#30923D;padding:30px;text-align:center;">
            <h1 style="margin:0;color:#FFFFFF;font-size:30px;font-weight:700;">
              Fatouah
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:40px 30px;">
            <h2 style="margin:0 0 20px;color:#333333;font-size:24px;">
              Password Reset Request
            </h2>

            <p style="font-size:16px;line-height:1.7;color:#555555;margin-bottom:25px;">
              We received a request to reset your password.
              Use the verification code below to continue.
            </p>

            <div style="text-align:center;margin:35px 0;">
              <div style="
                display:inline-block;
                background:#30923D;
                color:#FFFFFF;
                padding:16px 32px;
                border-radius:10px;
                font-size:32px;
                font-weight:700;
                letter-spacing:6px;
              ">
                ${values.otp}
              </div>
            </div>

            <p style="font-size:15px;color:#666666;line-height:1.7;">
              This verification code is valid for
              <strong>3 minutes</strong>.
            </p>

            <p style="font-size:15px;color:#666666;line-height:1.7;">
              If you did not request a password reset, you can safely ignore
              this email. Your account will remain secure.
            </p>
          </div>

          <!-- Footer -->
          <div style="
            border-top:1px solid #EEEEEE;
            padding:20px;
            text-align:center;
            color:#888888;
            font-size:13px;
          ">
            © ${new Date().getFullYear()} Fatouah. All rights reserved.
          </div>

        </div>
      </body>
    `,
  };
};

export const emailTemplate = {
  createAccount,
  resetPassword,
};