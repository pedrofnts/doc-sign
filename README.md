# Legendários

## Project info

**URL**: https://lovable.dev/projects/8beb02e7-7f2c-4644-866c-43dc3310d4b3

## Funcionalidades

O Legendários é um sistema de formulário para assinaturas que permite:

- Preenchimento de dados pessoais
- Geração automática de PDF preenchido
- Download do formulário em PDF
- Interface limpa e focada

### Configuração do PDF

O projeto utiliza a API PDF.co para gerar PDFs preenchidos. Para configurar:

1. Obtenha uma API key gratuita em [PDF.co](https://pdf.co)
2. Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_PDF_CO_API_KEY=sua_api_key_aqui
   ```
3. O template PDF está hospedado no GitHub: `https://raw.githubusercontent.com/pedrofnts/assinatura-elegante-formulario/main/doc.pdf`

Mais detalhes em `src/docs/PDF_SETUP.md`.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8beb02e7-7f2c-4644-866c-43dc3310d4b3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- PDF.co API (for PDF generation)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8beb02e7-7f2c-4644-866c-43dc3310d4b3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
