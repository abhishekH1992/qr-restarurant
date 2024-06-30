import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './custom.scss'
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CartProvider } from './context/CartContext'
import { SiteProvider } from './context/SiteContext.jsx'

const client = new ApolloClient({
    // TODO - Uncomment
    // uri: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql",
    uri: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "graphql",
    cache: new InMemoryCache(),
    credentials: 'include'
  });

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <SiteProvider>
                    <CartProvider>
                        <NextUIProvider>
                            <App />
                        </NextUIProvider>
                    </CartProvider>
                </SiteProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
