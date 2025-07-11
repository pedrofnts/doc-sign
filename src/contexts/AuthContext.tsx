import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, AuthState, LoginCredentials, UserRole, ROLE_PERMISSIONS } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (module: string, action: string) => boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuários para demonstração
const MOCK_USERS: Array<Omit<User, 'permissions'> & { password: string }> = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'admin.cadastro@example.com',
    password: '123456',
    role: 'admin_cadastro',
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'admin.financeiro@example.com',
    password: '123456',
    role: 'admin_financeiro',
  },
  {
    id: '3',
    nome: 'Pedro Oliveira',
    email: 'admin.analise@example.com',
    password: '123456',
    role: 'admin_analise',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user: {
            ...user,
            permissions: ROLE_PERMISSIONS[user.role as UserRole],
          },
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simular chamada para API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!mockUser) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw new Error('Credenciais inválidas');
    }
    
    const { password, ...userWithoutPassword } = mockUser;
    const user: User = {
      ...userWithoutPassword,
      permissions: ROLE_PERMISSIONS[mockUser.role],
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!authState.user) return false;
    
    const modulePermission = authState.user.permissions.find(p => p.module === module);
    return modulePermission?.actions.includes(action) || false;
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 