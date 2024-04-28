import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/fonts.css'
import './assets/styles/styles.css'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document?.getElementById?.('root')

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
