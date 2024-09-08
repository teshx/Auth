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
