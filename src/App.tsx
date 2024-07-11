import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTelegram } from 'hooks';
import { useEffect, useState } from 'react';
import { ErrorPage, PageLoader } from 'components';
import { envs } from 'constants/index';
import { useTonWallet } from '@tonconnect/ui-react';
import { useGetNftBonusQuery, useGetProfileQuery } from './services';
import { isDev } from './helpers';
import {
  Game,
  Referals,
  Leadboard,
  Boosts,
  Earn,
} from './pages';

function App() {
  const tg = useTelegram();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isTgLoading, setTgLoading] = useState(true);
  const [isTgReady, setTgReady] = useState(false);

  const {
    isLoading: isGetProfileLoading,
    isError,
  } = useGetProfileQuery(undefined, { skip: !isTgReady });

  const wallet = useTonWallet();

  useGetNftBonusQuery(wallet?.account.walletStateInit);

  const isLoading = isTgLoading || isGetProfileLoading;

  useEffect(() => {
    const tgInitData = isDev() ? envs.testInitData : tg.initData;
    window.localStorage.setItem('tgData', tgInitData);
    setTgLoading(false);
    setTgReady(true);
  }, [tg]);

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.backgroundColor = '#150801';
    tg.headerColor = '#150801';
  }, [tg]);

  useEffect(() => {
    const onBack = () => navigate(-1);

    if (pathname !== '/') {
      tg.BackButton.show();
      tg.BackButton.onClick(onBack);
    } else {
      tg.BackButton.offClick(onBack);
      tg.BackButton.hide();
    }
  }, [tg, navigate, pathname]);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      <Route path="/*" element={<Game />} />
      <Route path="/referals" element={<Referals />} />
      <Route path="/leadboard" element={<Leadboard />} />
      <Route path="/boosts" element={<Boosts />} />
      <Route path="/earn" element={<Earn />} />
    </Routes>
  );
}

export default App;
