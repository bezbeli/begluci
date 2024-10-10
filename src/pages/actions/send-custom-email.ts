import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const to = formData.get("recipient") as string | null;
  const name = formData.get("name") as string | null;
  const subject = `${name} šalje poruku sa Begluka na interwebu!`;
  const html = formData.get("message") as string | null;
  console.log({ to, subject, name, html });

  if (!to || !html || !name) {
    throw new Error("Missing required fields");
  }

  try {
    await sendEmail({ to, subject, template: { name: "custom", params: { name, html } } });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }

  return redirect("/success");
};
