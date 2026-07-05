import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.userMessage || !data.botResponse) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const log = await prisma.chatLog.create({
      data: {
        userMessage: data.userMessage,
        botResponse: data.botResponse,
      }
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Failed to save chat log:', error);
    return NextResponse.json({ error: 'Failed to save chat log' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Require ADMIN role
    if (session?.user?.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch the latest 100 chat logs
    const logs = await prisma.chatLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Failed to fetch chat logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
