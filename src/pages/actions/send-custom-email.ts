import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  // const to = formData.get("recipient") as string | null;
  const to = import.meta.env.SEND_EMAIL_TO;
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const subject = `${name} šalje poruku sa Begluka`;
  const message = formData.get("message") as string | null;
  console.log({ to, email, subject, name, message });

  if (!email || !message || !name) {
    throw new Error("Missing required fields");
  }

  try {
    await sendEmail({ to, subject, template: { name: "custom", params: { email, name, message } } });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }

  return redirect("/success");
};
