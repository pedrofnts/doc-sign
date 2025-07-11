
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface SubscriptionFormProps {
  onBack: () => void;
}

export const SubscriptionForm = ({ onBack }: SubscriptionFormProps) => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    endereco: "",
    telefone: "",
  });
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [dataEvento, setDataEvento] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Máscara para CPF
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Máscara para telefone brasileiro
  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'telefone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateForm = () => {
    if (!formData.nomeCompleto.trim()) return "Nome completo é obrigatório";
    if (!formData.cpf.replace(/\D/g, '') || formData.cpf.replace(/\D/g, '').length !== 11) return "CPF inválido";
    if (!dataNascimento) return "Data de nascimento é obrigatória";
    if (!formData.endereco.trim()) return "Endereço é obrigatório";
    if (!formData.telefone.replace(/\D/g, '') || formData.telefone.replace(/\D/g, '').length < 10) return "Telefone inválido";
    if (!dataEvento) return "Data do evento é obrigatória";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Erro de validação",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Assinatura criada com sucesso!",
      description: "Sua nova assinatura foi registrada no sistema.",
    });
    
    setIsSubmitting(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-slate-600 hover:text-slate-800 hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Nova Assinatura</h1>
          <p className="text-slate-600">Preencha os dados abaixo para criar sua nova assinatura</p>
        </div>

        {/* Form Card */}
        <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-slate-800">
              Dados da Assinatura
            </CardTitle>
            <CardDescription className="text-slate-600">
              Todas as informações são obrigatórias
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto" className="text-slate-700 font-medium">
                  Nome Completo
                </Label>
                <Input
                  id="nomeCompleto"
                  placeholder="Digite seu nome completo"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-slate-700 font-medium">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  maxLength={14}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  Data de Nascimento
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-slate-200",
                        !dataNascimento && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataNascimento ? format(dataNascimento, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataNascimento}
                      onSelect={setDataNascimento}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-slate-700 font-medium">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  placeholder="Rua, número, complemento, bairro, cidade - UF"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-slate-700 font-medium">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  maxLength={15}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* Data do Evento */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  Data do Evento
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-slate-200",
                        !dataEvento && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataEvento ? format(dataEvento, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data do evento"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataEvento}
                      onSelect={setDataEvento}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
