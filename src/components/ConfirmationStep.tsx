import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Edit, User, Phone, MapPin, Hash, Calendar } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";

interface FormData {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
}

interface ConfirmationStepProps {
  formData: FormData;
  onBack: () => void;
  onConfirm: () => void;
  onEdit: () => void;
  isSubmitting: boolean;
}

export const ConfirmationStep = ({
  formData,
  onBack,
  onConfirm,
  onEdit,
  isSubmitting
}: ConfirmationStepProps) => {
  const formatCPFDisplay = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhoneDisplay = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-4 md:py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header - apenas em desktop */}
        <div className="mb-6 hidden md:block">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-slate-600 hover:text-slate-800 hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Confirmação dos Dados
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Revise as informações antes de finalizar
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep="confirmation" onBack={onBack} />

        {/* Confirmation Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold text-slate-800 flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-600" />
              Revisar Informações
            </CardTitle>
            <CardDescription className="text-slate-600">
              Confira se todos os dados estão corretos
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Dados Pessoais
              </h3>
              
              <div className="grid gap-4">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 mb-1">Nome Completo</p>
                    <p className="text-slate-800 font-medium break-words">
                      {formData.nomeCompleto}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Hash className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 mb-1">CPF</p>
                    <p className="text-slate-800 font-medium">
                      {formatCPFDisplay(formData.cpf.replace(/\D/g, ''))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 mb-1">Data de Nascimento</p>
                    <p className="text-slate-800 font-medium">
                      {formData.dataNascimento}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 mb-1">Endereço</p>
                    <p className="text-slate-800 font-medium break-words">
                      {formData.endereco}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 mb-1">Telefone</p>
                    <p className="text-slate-800 font-medium">
                      {formatPhoneDisplay(formData.telefone)}
                    </p>
                  </div>
                </div>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={onEdit}
                variant="outline"
                className="flex-1 h-12 border-slate-200 hover:bg-slate-50"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              
              <Button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Confirmar e Enviar
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 