import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";     // ← make sure this is from react-router-dom
import { system } from './theme'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')



createRoot(rootElement).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <App />
      </BrowserRouter>    
    </ChakraProvider>
  </StrictMode>
)