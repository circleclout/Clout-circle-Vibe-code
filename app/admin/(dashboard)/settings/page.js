import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  // Restrict access to Admins only
  if (session?.user?.role?.toUpperCase() !== "ADMIN") {
    return (
      <div>
        <h1>Site Settings</h1>
        <div style={{ padding: '20px', background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderRadius: '8px', marginTop: '20px' }}>
          <strong>Access Denied:</strong> You must be an administrator to view and change site settings.
        </div>
      </div>
    );
  }

  // Fetch settings or default
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        siteName: 'Clout Circle',
        contactEmail: 'contact@cloutcircle.com',
      }
    });
  }

  return (
    <div>
      <h1>Site Settings</h1>
      <p>Manage global website configurations (Admins Only).</p>
      
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
