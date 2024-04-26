import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/fonts.css'
import './assets/styles/styles.css'

const rootElement = document?.getElementById?.('root')

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
