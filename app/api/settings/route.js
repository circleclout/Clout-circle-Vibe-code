import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst();
    
    // If no settings exist yet, create a default one
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          siteName: 'Clout Circle',
          contactEmail: 'contact@cloutcircle.com',
          contactPhone: '',
          contactAddress: '',
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Require ADMIN role
    if (session?.user?.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const data = await req.json();

    // We assume there's only one record, so we just get the first one or create it.
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: data.siteName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          contactAddress: data.contactAddress,
          twitterUrl: data.twitterUrl,
          linkedInUrl: data.linkedInUrl,
          instagramUrl: data.instagramUrl,
        }
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          contactAddress: data.contactAddress,
          twitterUrl: data.twitterUrl,
          linkedInUrl: data.linkedInUrl,
          instagramUrl: data.instagramUrl,
        }
      });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
