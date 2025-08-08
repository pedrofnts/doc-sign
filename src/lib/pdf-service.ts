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
  email?: string;
  estadoCivil?: string;
  dataEventoInicio?: Date;
  dataEventoFim?: Date;
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
    
    // Format date as DD/MM/YYYY
    const formatDateToBR = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };
    
    return [
      {
        text: formData.nomeCompleto,
        x: 155.06,
        y: 74.59,
        pages: "0"
      },
      {
        text: cpfNumbers,
        x: 100.71,
        y: 93.47,
        pages: "0"
      },
      {
        text: formData.endereco,
        x: 168.53,
        y: 112.77,
        pages: "0"
      },
      {
        text: formData.estadoCivil || "Solteiro(a)",
        x: 131.35,
        y: 151.83,
        pages: "0"
      },
      {
        text: formatDateToBR(formData.dataNascimento),
        x: 172.35,
        y: 171,
        pages: "0"
      },
      {
        text: phoneNumbers,
        x: 118.18,
        y: 190.83,
        pages: "0"
      },
      {
        text: formData.email || (formData.nomeCompleto.toLowerCase().replace(/\s+/g, '') + "@email.com"),
        x: 108.18,
        y: 210.65,
        pages: "0"
      },
      {
        text: formatDateToBR(new Date()),
        x: 115.06,
        y: 386.47,
        pages: "4"
      },
      {
        text: "Salvador/BA",
        x: 159.24,
        y: 401.3,
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
export default PDFService; 
export default PDFService; 