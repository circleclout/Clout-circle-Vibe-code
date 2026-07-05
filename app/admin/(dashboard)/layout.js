import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./AdminLayout.module.css";
import AdminNav from "./AdminNav";
export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>CC Admin</div>
          <AdminNav />
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
