//import { StrictMode } from 'react'
/*import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { StoreContext } from './Context/StoreContext.jsx'
ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContext>
    <App />
  </StoreContext>
  </BrowserRouter>
)
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
