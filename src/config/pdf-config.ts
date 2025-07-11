export const PDF_CONFIG = {
  // PDF.co API Configuration
  API_KEY: import.meta.env.VITE_PDF_CO_API_KEY || 'INSERT_YOUR_API_KEY_HERE',
  
  // PDF Template URL - replace with your actual PDF URL
  TEMPLATE_URL: import.meta.env.VITE_PDF_TEMPLATE_URL || 'https://your-pdf-storage-url.com/regras-de-participacao-desafio-top.pdf',
  
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
    console.warn('PDF.co API key not configured. Please set VITE_PDF_CO_API_KEY environment variable.');
    return false;
  }
  
  if (PDF_CONFIG.TEMPLATE_URL === 'https://your-pdf-storage-url.com/regras-de-participacao-desafio-top.pdf') {
    console.warn('PDF template URL not configured. Please set VITE_PDF_TEMPLATE_URL environment variable.');
    return false;
  }
  
  return true;
}; 