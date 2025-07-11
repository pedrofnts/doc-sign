import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminCadastro from "./AdminCadastro";
import AdminFinanceiro from "./AdminFinanceiro";
import AdminAnalise from "./AdminAnalise";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'admin_cadastro':
      return <AdminCadastro />;
    case 'admin_financeiro':
      return <AdminFinanceiro />;
    case 'admin_analise':
      return <AdminAnalise />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default AdminDashboard; 