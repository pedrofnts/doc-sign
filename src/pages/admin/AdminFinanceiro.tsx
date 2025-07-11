import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Search, 
  LogOut, 
  Calendar,
  Filter,
  Download,
  AlertCircle
} from "lucide-react";
import { ROLE_LABELS } from "@/types/auth";

const AdminFinanceiro = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const mockPayments = [
    { id: 1, cliente: "João Silva", valor: 250.00, status: "Pago", data: "2024-01-15", metodo: "Cartão" },
    { id: 2, cliente: "Maria Santos", valor: 250.00, status: "Pendente", data: "2024-01-16", metodo: "PIX" },
    { id: 3, cliente: "Pedro Oliveira", valor: 250.00, status: "Vencido", data: "2024-01-10", metodo: "Boleto" },
  ];

  const mockInvoices = [
    { id: 1, numero: "INV-2024-001", cliente: "João Silva", valor: 250.00, status: "Paga", vencimento: "2024-02-15" },
    { id: 2, numero: "INV-2024-002", cliente: "Maria Santos", valor: 250.00, status: "Em aberto", vencimento: "2024-02-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pago':
      case 'paga':
        return 'bg-green-100 text-green-800';
      case 'pendente':
      case 'em aberto':
        return 'bg-yellow-100 text-yellow-800';
      case 'vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Financeiro</h1>
                <p className="text-slate-600">Gestão de pagamentos e faturas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                {ROLE_LABELS[user?.role || 'user']}
              </Badge>
              <span className="text-slate-600">Olá, {user?.nome}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-slate-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Receita Total</p>
                <p className="text-2xl font-bold text-slate-800">R$ 45.280</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pagamentos Este Mês</p>
                <p className="text-2xl font-bold text-slate-800">R$ 12.500</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pendentes</p>
                <p className="text-2xl font-bold text-slate-800">R$ 3.750</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Crescimento</p>
                <p className="text-2xl font-bold text-slate-800">+23%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestão de Pagamentos</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os pagamentos
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar pagamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button size="sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Novo Pagamento
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{payment.cliente}</p>
                      <p className="text-sm text-slate-600">{payment.metodo} - {formatCurrency(payment.valor)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      {new Date(payment.data).toLocaleDateString('pt-BR')}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoices Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Faturas</CardTitle>
                <CardDescription>
                  Gerencie faturas e cobranças
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Nova Fatura
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{invoice.numero}</p>
                      <p className="text-sm text-slate-600">{invoice.cliente} - {formatCurrency(invoice.valor)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      Venc: {new Date(invoice.vencimento).toLocaleDateString('pt-BR')}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Relatórios Financeiros</CardTitle>
                <CardDescription>
                  Análises e relatórios de desempenho financeiro
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-800">Receita Mensal</h3>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">R$ 12.500</p>
                <p className="text-sm text-slate-600">Comparado ao mês anterior</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-800">Taxa de Conversão</h3>
                  <span className="text-sm text-blue-600 font-medium">95%</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">234/246</p>
                <p className="text-sm text-slate-600">Pagamentos confirmados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminFinanceiro; 