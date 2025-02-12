import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY!);

export const sendEmail = async (userEmail: string) => {
  try {
    await resend.emails.send({
      from: "bookmyslot@code10x.online",
      to: userEmail,
      subject: "Hello from Resend!",
      html: "<p>This is a test email sent using Resend.</p>",
    });
    console.log("email send");
  } catch (error) {
    console.log(error);
  }
};
