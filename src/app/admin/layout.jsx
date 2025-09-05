export const metadata = {
  title: 'Admin | HH6 Influential',
  description: 'Admin dashboard for HH6 Influential',
  robots: 'noindex,nofollow',
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
