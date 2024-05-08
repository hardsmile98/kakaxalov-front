import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from 'store/store'
import App from './App'
import './assets/styles/fonts.css'
import './assets/styles/styles.css'

const rootElement = document?.getElementById?.('root')

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}
