import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p>Welcome back, {session?.user?.name || session?.user?.email}!</p>
      <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
        <h3>Your Info</h3>
        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><strong>Role:</strong> {session?.user?.role}</p>
      </div>
    </div>
  );
}
