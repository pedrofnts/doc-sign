import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Calendar, 
  LogOut, 
  Filter,
  Download,
  Eye,
  Target,
  Activity
} from "lucide-react";
import { ROLE_LABELS } from "@/types/auth";

const AdminAnalise = () => {
  const { user, logout } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock data for demonstration
  const mockMetrics = [
    { label: "Conversão", value: "23.5%", change: "+2.3%", trend: "up" },
    { label: "Engajamento", value: "68%", change: "+5.1%", trend: "up" },
    { label: "Retenção", value: "85%", change: "-1.2%", trend: "down" },
    { label: "Satisfação", value: "4.8/5", change: "+0.2", trend: "up" },
  ];

  const mockReports = [
    { id: 1, titulo: "Relatório de Crescimento", tipo: "Mensal", data: "2024-01-15", status: "Pronto" },
    { id: 2, titulo: "Análise de Conversão", tipo: "Semanal", data: "2024-01-20", status: "Processando" },
    { id: 3, titulo: "Perfil de Usuários", tipo: "Trimestral", data: "2024-01-10", status: "Pronto" },
  ];

  const mockChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      { name: 'Assinaturas', data: [65, 78, 82, 95, 108, 125] },
      { name: 'Cancelamentos', data: [12, 15, 18, 8, 12, 10] },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pronto':
        return 'bg-green-100 text-green-800';
      case 'processando':
        return 'bg-yellow-100 text-yellow-800';
      case 'erro':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗' : '↘';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard de Análise</h1>
                <p className="text-slate-600">Analytics e relatórios de desempenho</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="90d">90 dias</SelectItem>
                  <SelectItem value="1y">1 ano</SelectItem>
                </SelectContent>
              </Select>
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change}
                  </span>
                  <span className={`text-lg ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Crescimento de Assinaturas
              </CardTitle>
              <CardDescription>
                Evolução mensal das assinaturas vs cancelamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                  <p className="text-slate-600">Gráfico de barras</p>
                  <p className="text-sm text-slate-500">Dados dos últimos 6 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Distribuição por Categoria
              </CardTitle>
              <CardDescription>
                Segmentação dos usuários por tipo de assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                  <p className="text-slate-600">Gráfico de pizza</p>
                  <p className="text-sm text-slate-500">Distribuição atual</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Insights de Performance
            </CardTitle>
            <CardDescription>
              Principais métricas e tendências identificadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-green-800">Crescimento Forte</h3>
                </div>
                <p className="text-sm text-green-700">
                  Aumento de 23% nas assinaturas este mês comparado ao anterior
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-800">Engajamento Alto</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Taxa de engajamento 15% acima da média do setor
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                  <h3 className="font-medium text-yellow-800">Oportunidade</h3>
                </div>
                <p className="text-sm text-yellow-700">
                  Pico de atividade nas sextas-feiras às 14h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Relatórios Personalizados</CardTitle>
                <CardDescription>
                  Gerencie e visualize relatórios analíticos
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Novo Relatório
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{report.titulo}</p>
                      <p className="text-sm text-slate-600">{report.tipo} - {new Date(report.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalise; 