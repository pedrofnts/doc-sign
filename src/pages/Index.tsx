
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, Users, Shield } from "lucide-react";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  if (showForm) {
    return <SubscriptionForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">
                Sistema de Assinaturas
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Gerencie suas assinaturas de forma simples e eficiente
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                size="sm"
                className="bg-white/80 hover:bg-white border-slate-300"
              >
                <Shield className="w-4 h-4 mr-2" />
                Área Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Create Subscription */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Nova Assinatura
              </CardTitle>
              <CardDescription className="text-slate-600">
                Crie uma nova assinatura para o evento
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Começar Agora
              </Button>
            </CardContent>
          </Card>

          {/* View Subscriptions */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Visualizar Assinaturas
              </CardTitle>
              <CardDescription className="text-slate-600">
                Consulte e gerencie suas assinaturas existentes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Ver Assinaturas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
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
