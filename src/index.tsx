import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import store from 'store/index'
import App from './App'
import './assets/styles/fonts.css'
import './assets/styles/styles.css'

const rootElement = document?.getElementById?.('root')

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  )
}
