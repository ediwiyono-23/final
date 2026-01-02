import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TentangKami from "./pages/tentangkami";
import Kontak from "./pages/kontak";
import Admin from "./pages/Admin";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <Routes>
      {/* ROOT → LOGIN */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PUBLIC (WAJIB LOGIN) */}
      <Route
        element={
          <ProtectedRoute>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/tentang" element={<TentangKami />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/detail-produk/:id" element={<Detail />} />
      </Route>

      {/* ADMIN (ADMIN ONLY) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
