
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { SubscriptionForm } from "@/components/SubscriptionForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <SubscriptionForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Track Outdoor
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Formulário de Asssinatura
          </p>
        </div>

        {/* Main Action */}
        <div className="flex justify-center max-w-md mx-auto px-4">
          {/* Create Subscription */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl w-full">
            <CardHeader className="text-center pb-4 md:pb-6">
              <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-semibold text-slate-800">
                Novo Termo
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm md:text-base">
                Crie um novo termo de responsabilidade para o evento
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Começar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
