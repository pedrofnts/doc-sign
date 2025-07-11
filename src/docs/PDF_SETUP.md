# Configuração da API PDF.co

Este projeto utiliza a API PDF.co para gerar PDFs preenchidos com os dados do formulário.

## Configuração Inicial

### 1. Obter API Key

1. Acesse [PDF.co](https://pdf.co)
2. Crie uma conta gratuita
3. Vá para o painel de controle
4. Copie sua API key

### 2. Hospedar o PDF Template

O PDF template já está hospedado no GitHub:
- URL: `https://raw.githubusercontent.com/pedrofnts/assinatura-elegante-formulario/main/doc.pdf`
- Arquivo: `doc.pdf` (localizado na raiz do projeto)

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_PDF_CO_API_KEY=sua_api_key_aqui
VITE_PDF_TEMPLATE_URL=https://raw.githubusercontent.com/pedrofnts/assinatura-elegante-formulario/main/doc.pdf
```

**Nota:** A URL do template já está configurada por padrão no código, mas você pode sobrescrever usando a variável de ambiente.

## Coordenadas dos Campos

As coordenadas dos campos foram mapeadas conforme o exemplo da API:

| Campo | Coordenada X | Coordenada Y | Página |
|-------|-------------|-------------|---------|
| Nome Completo | 159 | 192.88 | 0 |
| CPF | 96.37 | 221.51 | 0 |
| Dia Nascimento | 178.63 | 250.26 | 0 |
| Mês Nascimento | 215.5 | 250.51 | 0 |
| Ano Nascimento | 250 | 251.13 | 0 |
| Endereço | 123.62 | 280.88 | 0 |
| DDD | 125 | 309.13 | 0 |
| Telefone | 159.62 | 308.63 | 0 |
| Dia Evento | 169.12 | 164.38 | 0 |
| Dia Evento (2) | 216.62 | 165.51 | 0 |
| Mês Evento | 307 | 164 | 0 |
| Ano Evento | 441 | 165.38 | 0 |
| Cidade | 106.75 | 367.88 | 4 |
| Data Atual | 102.49 | 399.5 | 4 |

## Estrutura do Código

### `src/lib/pdf-service.ts`
- Serviço principal para comunicação com a API
- Mapeamento de dados para coordenadas
- Geração e download do PDF

### `src/config/pdf-config.ts`
- Configurações da API
- Validação de configuração
- URL do template: `https://raw.githubusercontent.com/pedrofnts/assinatura-elegante-formulario/main/doc.pdf`

### `src/components/SubscriptionForm.tsx`
- Integração com o serviço PDF
- Estados de loading
- Tratamento de erros

## Teste da Configuração

Para testar se a configuração está correta:

1. Abra o console do navegador
2. Procure por mensagens de aviso sobre configuração
3. Teste a geração do PDF com dados de exemplo

## Solução de Problemas

### "API não está configurada corretamente"
- Verifique se as variáveis de ambiente estão definidas
- Confirme se a API key está correta

### "HTTP error! status: 401"
- API key inválida ou não configurada
- Verifique sua conta PDF.co

### "HTTP error! status: 404"
- URL do PDF template não encontrada
- Verifique se o arquivo está acessível publicamente
- URL padrão: `https://raw.githubusercontent.com/pedrofnts/assinatura-elegante-formulario/main/doc.pdf`

### "Erro ao baixar PDF"
- Problemas de conexão
- URL do PDF gerado pode estar inacessível 