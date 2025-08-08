export const PDF_CONFIG = {
  // PDF.co API Configuration
  API_KEY: import.meta.env.VITE_PDF_CO_API_KEY || 'INSERT_YOUR_API_KEY_HERE',
  
  // PDF Template URL - NDA template
  TEMPLATE_URL: import.meta.env.VITE_PDF_TEMPLATE_URL || 'INSERT_URL_TO_INPUT_FILE_NDA_Servidores_19_03_25.pdf',
  
  // API Base URL
  BASE_URL: 'https://api.pdf.co/v1',
  
  // PDF Generation Settings
  SETTINGS: {
    async: false,
    encrypt: false,
    inline: true,
  }
};

// Validation helper
export const validatePDFConfig = (): boolean => {
  if (PDF_CONFIG.API_KEY === 'INSERT_YOUR_API_KEY_HERE') {
    console.warn('PDF.co API key not configured. Please se VITE_PDF_CO_API_KEY environment variable.');
    return false;
  }
  
  // A URL do template agora está configurada por padrão, então não precisamos validar
  return true;
}; 