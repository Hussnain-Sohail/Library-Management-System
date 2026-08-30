import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import TokenProvider from './TokenProvider.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TokenProvider>{<App />}</TokenProvider>
  </BrowserRouter>
)
