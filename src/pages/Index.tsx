
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, Users } from "lucide-react";
import { SubscriptionForm } from "@/components/SubscriptionForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <SubscriptionForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Sistema de Assinaturas
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Gerencie suas assinaturas de forma simples e eficiente
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Nova Assinatura Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Nova Assinatura
              </CardTitle>
              <CardDescription className="text-slate-600">
                Crie uma nova assinatura para seu evento
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Começar Agora
              </Button>
            </CardContent>
          </Card>

          {/* Visualizar Assinaturas Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Minhas Assinaturas
              </CardTitle>
              <CardDescription className="text-slate-600">
                Visualize e gerencie suas assinaturas existentes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline"
                className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium py-3 rounded-lg transition-all duration-300"
                size="lg"
              >
                Ver Assinaturas
              </Button>
            </CardContent>
          </Card>

          {/* Relatórios Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Relatórios
              </CardTitle>
              <CardDescription className="text-slate-600">
                Acompanhe estatísticas e relatórios detalhados
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline"
                className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-medium py-3 rounded-lg transition-all duration-300"
                size="lg"
              >
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">
            Por que escolher nosso sistema?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Simples e Intuitivo</h3>
              <p className="text-slate-600 text-sm">Interface limpa e fácil de usar</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Seguro e Confiável</h3>
              <p className="text-slate-600 text-sm">Seus dados protegidos com segurança</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Sempre Atualizado</h3>
              <p className="text-slate-600 text-sm">Novas funcionalidades constantemente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
