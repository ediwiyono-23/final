import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-900">
      <AdminHeader /> 
      <main className="p-4 md:p-8">
        <Outlet /> 
      </main>
    </div>
  );
}
