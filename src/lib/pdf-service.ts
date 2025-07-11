interface PDFAnnotation {
  text: string;
  x: number;
  y: number;
  pages: string;
}

interface PDFFormData {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: Date;
  endereco: string;
  telefone: string;
  dataEventoInicio: Date;
  dataEventoFim: Date;
}

import { PDF_CONFIG, validatePDFConfig } from '@/config/pdf-config';

export class PDFService {
  private apiKey: string;
  private baseUrl: string = PDF_CONFIG.BASE_URL;
  private pdfUrl: string = PDF_CONFIG.TEMPLATE_URL;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private formatCPFNumbers(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private formatPhoneNumbers(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  private mapFormDataToAnnotations(formData: PDFFormData): PDFAnnotation[] {
    const cpfNumbers = this.formatCPFNumbers(formData.cpf);
    const phoneNumbers = this.formatPhoneNumbers(formData.telefone);
    
    const dayBirth = formData.dataNascimento.getDate().toString().padStart(2, '0');
    const monthBirth = (formData.dataNascimento.getMonth() + 1).toString().padStart(2, '0');
    const yearBirth = formData.dataNascimento.getFullYear().toString();
    
    // Extrair informações das datas do evento
    const dayEventStart = formData.dataEventoInicio.getDate().toString().padStart(2, '0');
    const dayEventEnd = formData.dataEventoFim.getDate().toString().padStart(2, '0');
    const monthEventStart = formData.dataEventoInicio.toLocaleDateString('pt-BR', { month: 'long' });
    const yearEventStart = formData.dataEventoInicio.getFullYear().toString();
    
    // Extrair DDD e número do telefone
    const ddd = phoneNumbers.substring(0, 2);
    const phoneNumber = phoneNumbers.substring(2);
    
    return [
      {
        text: formData.nomeCompleto,
        x: 159,
        y: 192.88,
        pages: "0"
      },
      {
        text: cpfNumbers,
        x: 96.37,
        y: 221.51,
        pages: "0"
      },
      {
        text: dayBirth,
        x: 178.63,
        y: 250.26,
        pages: "0"
      },
      {
        text: monthBirth,
        x: 215.5,
        y: 250.51,
        pages: "0"
      },
      {
        text: yearBirth,
        x: 250,
        y: 251.13,
        pages: "0"
      },
      {
        text: formData.endereco,
        x: 123.62,
        y: 280.88,
        pages: "0"
      },
      {
        text: ddd,
        x: 125,
        y: 309.13,
        pages: "0"
      },
      {
        text: phoneNumber,
        x: 159.62,
        y: 308.63,
        pages: "0"
      },
      // Dia inicial do evento
      {
        text: dayEventStart,
        x: 169.12,
        y: 164.38,
        pages: "0"
      },
      // Dia final do evento
      {
        text: dayEventEnd,
        x: 216.62,
        y: 165.51,
        pages: "0"
      },
      // Mês do evento
      {
        text: monthEventStart,
        x: 307,
        y: 164,
        pages: "0"
      },
      // Ano do evento
      {
        text: yearEventStart,
        x: 441,
        y: 165.38,
        pages: "0"
      },
      {
        text: "São Paulo",
        x: 106.75,
        y: 367.88,
        pages: "4"
      },
      {
        text: new Date().toLocaleDateString('pt-BR'),
        x: 102.49,
        y: 399.5,
        pages: "4"
      }
    ];
  }

  async generatePDF(formData: PDFFormData): Promise<string> {
    // Validate configuration
    if (!validatePDFConfig()) {
      throw new Error('PDF.co API não está configurada corretamente. Verifique as variáveis de ambiente.');
    }

    const annotations = this.mapFormDataToAnnotations(formData);
    
    const payload = {
      url: this.pdfUrl,
      ...PDF_CONFIG.SETTINGS,
      annotations: annotations,
      images: [],
      fields: []
    };

    try {
      const response = await fetch(`${this.baseUrl}/pdf/edit/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.message || 'Erro ao processar PDF');
      }

      return result.url;
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    }
  }

  async downloadPDF(url: string, filename: string = 'formulario-assinatura-elegante.pdf'): Promise<void> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      throw error;
    }
  }
}

// Singleton instance
let pdfServiceInstance: PDFService | null = null;

export const getPDFService = (): PDFService => {
  if (!pdfServiceInstance) {
    pdfServiceInstance = new PDFService(PDF_CONFIG.API_KEY);
  }
  return pdfServiceInstance;
};

export default PDFService; 