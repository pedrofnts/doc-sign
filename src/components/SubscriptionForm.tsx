
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Send, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { getPDFService } from "@/lib/pdf-service";
import { ConfirmationStep } from "./ConfirmationStep";
import { ProgressIndicator } from "./ProgressIndicator";

interface SubscriptionFormProps {
  onBack: () => void;
}

type FormStep = 'form' | 'confirmation' | 'success';

export const SubscriptionForm = ({ onBack }: SubscriptionFormProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('form');
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
    telefone: "",
  });
  const [dataEventoInicio, setDataEventoInicio] = useState<Date>();
  const [dataEventoFim, setDataEventoFim] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

  // Máscara para data DD/MM/YYYY
  const formatDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
      .replace(/(\d{2})\/(\d{2})\/(\d{4})\d+?$/, '$1/$2/$3');
  };

  // Validar data no formato DD/MM/YYYY
  const isValidDate = (dateString: string): boolean => {
    if (dateString.length !== 10) return false;
    
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day &&
           day >= 1 && day <= 31 &&
           month >= 1 && month <= 12 &&
           year >= 1900 && year <= new Date().getFullYear();
  };

  // Converter string DD/MM/YYYY para Date
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'telefone') {
      formattedValue = formatPhone(value);
    } else if (field === 'dataNascimento') {
      formattedValue = formatDate(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateForm = () => {
    if (!formData.nomeCompleto.trim()) return "Nome completo é obrigatório";
    if (!formData.cpf.replace(/\D/g, '') || formData.cpf.replace(/\D/g, '').length !== 11) return "CPF inválido";
    if (!formData.dataNascimento) return "Data de nascimento é obrigatória";
    if (!isValidDate(formData.dataNascimento)) return "Data de nascimento inválida";
    if (!formData.endereco.trim()) return "Endereço é obrigatório";
    if (!formData.telefone.replace(/\D/g, '') || formData.telefone.replace(/\D/g, '').length < 10) return "Telefone inválido";
    if (!dataEventoInicio) return "Data de início do evento é obrigatória";
    if (!dataEventoFim) return "Data de fim do evento é obrigatória";
    
    // Verificar se a data de início é anterior à data de fim
    if (dataEventoInicio > dataEventoFim) return "Data de início deve ser anterior à data de fim";
    
    return null;
  };

  const generatePDF = async () => {
    if (!formData.dataNascimento || !dataEventoInicio || !dataEventoFim) {
      toast({
        title: "Erro",
        description: "Todas as datas são obrigatórias para gerar o PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      const pdfService = getPDFService();
      
      const pdfFormData = {
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        dataNascimento: parseDate(formData.dataNascimento),
        endereco: formData.endereco,
        telefone: formData.telefone,
        dataEventoInicio: dataEventoInicio,
        dataEventoFim: dataEventoFim,
      };
      
      const pdfUrl = await pdfService.generatePDF(pdfFormData);
      await pdfService.downloadPDF(pdfUrl, 'formulario-assinatura-elegante.pdf');
      
      toast({
        title: "PDF gerado com sucesso!",
        description: "O formulário preenchido foi baixado para o seu dispositivo.",
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o documento. Verifique sua conexão com a internet e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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

    // Prosseguir para a tela de confirmação
    setCurrentStep('confirmation');
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Termo criado com sucesso!",
        description: "Seu termo foi registrado no sistema.",
      });
      
      setCurrentStep('success');
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nomeCompleto: "",
      cpf: "",
      dataNascimento: "",
      endereco: "",
      telefone: "",
    });
    setDataEventoInicio(undefined);
    setDataEventoFim(undefined);
    setCurrentStep('form');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handleEditFromConfirmation = () => {
    setCurrentStep('form');
  };

  // Render based on current step
  if (currentStep === 'confirmation') {
    return (
      <ConfirmationStep
        formData={formData}
        dataEventoInicio={dataEventoInicio!}
        dataEventoFim={dataEventoFim!}
        onBack={handleBackToForm}
        onConfirm={handleConfirmSubmit}
        onEdit={handleEditFromConfirmation}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (currentStep === 'success') {
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
          </div>
          
          {/* Progress Indicator */}
          <ProgressIndicator currentStep="success" onBack={onBack} />
          
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl md:text-2xl font-semibold text-green-600">
                Documento Gerado com Sucesso!
              </CardTitle>
              <CardDescription className="text-slate-600">
                Você pode baixar o PDF com os dados preenchidos
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              {/* Gov.br Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center mb-3">
                  <img 
                    src="/images/govbr.webp" 
                    alt="gov.br" 
                    className="h-8 w-auto"
                  />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Próximo Passo: Assinatura Digital
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Para finalizar o processo, você precisará assinar o documento digitalmente através do portal <strong>gov.br</strong>. 
                  Após baixar o PDF, acesse o portal para realizar a assinatura eletrônica.
                </p>
              </div>

              <Button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGeneratingPDF ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Gerando PDF...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </div>
                )}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-12 border-slate-200 hover:bg-slate-50"
              >
                Preencher Novo Formulário
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Nova Termo</h1>
          <p className="text-slate-600 text-sm md:text-base">Preencha os dados abaixo para criar seu termo de responsabilidade</p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep="form" onBack={onBack} />

        {/* Form Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-lg md:text-xl font-semibold text-slate-800">
              Dados da Assinatura
            </CardTitle>
            <CardDescription className="text-slate-600 text-sm md:text-base">
              Todas as informações são obrigatórias
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto" className="text-slate-700 font-medium text-sm md:text-base">
                  Nome Completo
                </Label>
                <Input
                  id="nomeCompleto"
                  placeholder="Digite seu nome completo"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm md:text-base"
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-slate-700 font-medium text-sm md:text-base">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  maxLength={14}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm md:text-base"
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="dataNascimento" className="text-slate-700 font-medium text-sm md:text-base">
                  Data de Nascimento
                </Label>
                <Input
                  id="dataNascimento"
                  placeholder="DD/MM/AAAA"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                  maxLength={10}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm md:text-base"
                />
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-slate-700 font-medium text-sm md:text-base">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  placeholder="Rua, número, complemento, bairro, cidade - UF"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm md:text-base"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-slate-700 font-medium text-sm md:text-base">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  maxLength={15}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm md:text-base"
                />
              </div>

              {/* Data de Início do Evento */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm md:text-base">
                  Data de Início do Evento
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-slate-200 text-sm md:text-base",
                        !dataEventoInicio && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataEventoInicio ? format(dataEventoInicio, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data de início"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataEventoInicio}
                      onSelect={setDataEventoInicio}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Data de Fim do Evento */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm md:text-base">
                  Data de Fim do Evento
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-slate-200 text-sm md:text-base",
                        !dataEventoFim && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataEventoFim ? format(dataEventoFim, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data de fim"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataEventoFim}
                      onSelect={setDataEventoFim}
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
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Continuar
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
