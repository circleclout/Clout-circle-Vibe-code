import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>My Profile</h1>
      <p>Manage your account settings and personal info here.</p>

      <div style={{ marginTop: '20px', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input 
              type="text" 
              defaultValue={session?.user?.name || ''} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              defaultValue={session?.user?.email} 
              disabled
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
            />
            <small style={{ color: 'var(--text-secondary)' }}>Contact an administrator to change your email.</small>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
            <input 
              type="text" 
              defaultValue={session?.user?.role} 
              disabled
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
            />
          </div>
          <button type="button" style={{ marginTop: '10px', padding: '12px', background: 'var(--gold)', color: 'var(--text-inverse)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
