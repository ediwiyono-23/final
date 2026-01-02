import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import DetailProduct from "./pages/public/DetailProduct";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/Auth/Login";    
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import EditProduct from "./pages/admin/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/detail-produk/:id" element={<DetailProduct />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route 
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={
        <div className="h-screen flex items-center justify-center flex-col gap-4">
          <h1 className="text-4xl font-black">404</h1>
          <p className="text-gray-500">Halaman tidak ditemukan.</p>
        </div>
      } />
    </Routes>
  );
}
