import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import { AuthProvider } from './context/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthProvider>
    </QueryClientProvider>
  </I18nextProvider>
)
