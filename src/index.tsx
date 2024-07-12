import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import store from 'store/index';
import { envs } from 'constants/index';
import App from './App';
import './assets/styles/fonts.css';
import './assets/styles/styles.css';
import { isDev } from './helpers';

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

const rootElement = document?.getElementById?.('root');

const languageLs = window.localStorage.getItem('lang') || 'ru';

const laguage = languageLs === 'ru' ? 'ru' : 'en';

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <TonConnectUIProvider
      manifestUrl={isDev() ? envs.testManifest : `${window.location.origin}/tonconnect-manifest.json`}
      language={laguage}
      uiPreferences={{ theme: 'SYSTEM', borderRadius: 's' }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
          >
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </TonConnectUIProvider>,
  );
}
