import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      {children}
    </div>
  );
}
