import { prisma } from "@/lib/prisma";

export async function getSettings() {
  // Bypassing DB settings since we are using static siteConfig
  return null;
}
