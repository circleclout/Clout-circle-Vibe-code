import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Chat Logs | Admin",
};

export default async function ChatLogsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role?.toUpperCase() !== "ADMIN") {
    return (
      <div>
        <h1>Chat Logs</h1>
        <div style={{ padding: '20px', background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', borderRadius: '8px', marginTop: '20px' }}>
          <strong>Access Denied:</strong> You must be an administrator to view chat logs.
        </div>
      </div>
    );
  }

  const logs = await prisma.chatLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <h1>Chat Logs</h1>
      <p>Recent chatbot interactions from users (Admins Only).</p>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {logs.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No chats recorded yet.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} style={{ padding: '15px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {new Date(log.createdAt).toLocaleString()}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>User:</strong> <span style={{ color: 'var(--gold, #d4af37)' }}>{log.userMessage}</span>
              </div>
              <div>
                <strong>Bot:</strong> {log.botResponse}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
