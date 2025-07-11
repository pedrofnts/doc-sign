import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredModule?: string;
  requiredAction?: string;
  fallback?: ReactNode;
}

const ProtectedRoute = ({
  children,
  requiredRole,
  requiredModule,
  requiredAction,
  fallback = <Navigate to="/login" replace />
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, hasPermission, hasRole } = useAuth();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // Se uma role específica for necessária, verifica se o usuário tem essa role
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se um módulo e ação específicos forem necessários, verifica as permissões
  if (requiredModule && requiredAction && !hasPermission(requiredModule, requiredAction)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 