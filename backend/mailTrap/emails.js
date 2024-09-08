import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { Mailtrap_client, sender } from "./mailtrapConfig.js";

export const sendverificationEmail = async (email, verificatiionToken) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "verify your emmail",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificatiionToken
      ),
      category: "Email verification",
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log(`error sending vverification`, error);
    throw new Error(`Error sending verification email :${error}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await Mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "verify your emmail",
      template_uuid: "a6b92155-803b-4e9b-8629-27f4ae7c5a26",
      template_variables: {},
      category: "Email verification",
    });
    console.log("Welcome email successfully", response);
  } catch (error) {
    console.log(`error sending welcome`, error);
    throw new Error(`Error sending welcome email :${error}`);
  }
};
