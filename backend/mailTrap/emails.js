import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplate.js";
import { Mailtrap_client, sender } from "./mailtrapConfig.js";

export const sendverificationEmail = async (email, verificatiionToken) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificatiionToken
      ),
      category: "Email verification",
    });
    console.log("Email send successfully");
  } catch (error) {
    console.log(`error sending verification`, error);
    throw new Error(`Error sending verification email :${error}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrap_client.send({
      from: sender,
      to: recipient,
      template_uuid: "a6b92155-803b-4e9b-8629-27f4ae7c5a26",
    });
    console.log("Welcome email successfully");
  } catch (error) {
    console.log(`error sending welcome`, error);
    throw new Error(`Error sending welcome email :${error}`);
  }
};

export const sendpassworedresetEmail = async (email, resetUrl ) => {
  const recipient = [{ email }];
  try {
    const response = await Mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "resset your email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "reset password",
    });
    console.log("resset email successfully");
  } catch (error) {
    console.log(`error sending welcome`, error);
    throw new Error(`Error sending reset email :${error}`);
  }
};
