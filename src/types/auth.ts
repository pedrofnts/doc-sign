export type UserRole = 'admin_cadastro' | 'admin_financeiro' | 'admin_analise' | 'user';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

export interface Permission {
  module: string;
  actions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Definição de permissões por perfil
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin_cadastro: [
    { module: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { module: 'subscriptions', actions: ['create', 'read', 'update', 'delete'] },
    { module: 'reports', actions: ['read'] },
  ],
  admin_financeiro: [
    { module: 'subscriptions', actions: ['read'] },
    { module: 'payments', actions: ['create', 'read', 'update', 'delete'] },
    { module: 'financial_reports', actions: ['create', 'read', 'update', 'delete'] },
    { module: 'invoices', actions: ['create', 'read', 'update', 'delete'] },
  ],
  admin_analise: [
    { module: 'subscriptions', actions: ['read'] },
    { module: 'analytics', actions: ['read'] },
    { module: 'reports', actions: ['create', 'read', 'update', 'delete'] },
    { module: 'dashboard', actions: ['read'] },
  ],
  user: [
    { module: 'subscriptions', actions: ['create', 'read'] },
  ],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin_cadastro: 'Administrador de Cadastro',
  admin_financeiro: 'Administrador Financeiro',
  admin_analise: 'Administrador de Análise',
  user: 'Usuário',
}; 