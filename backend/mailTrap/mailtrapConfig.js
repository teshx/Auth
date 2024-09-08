import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = "e3a0cb58d6eb2d27bb5dd312f0e72237";

export const Mailtrap_client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Teshx",
};
/* const recipients = [
  {
    email: "teshie00001@gmail.com",
  },
];


client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
 */
