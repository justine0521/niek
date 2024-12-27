import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext';
import {AuthProvider} from './Context/authContext.jsx'
import {OrdersProvider} from './Context/OrdersContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
