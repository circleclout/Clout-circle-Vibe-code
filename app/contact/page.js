import { getSettings } from "@/lib/getSettings";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Clout Circle to start your next marketing project.",
};

export default async function ContactPage() {
  const dbSettings = await getSettings();

  return <ContactClient dbSettings={dbSettings} />;
}
