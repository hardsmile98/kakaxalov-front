/* eslint-disable no-console */
import { envs } from 'constants/index';
import { isDev } from 'helpers/index';
import { useDispatch, useSelector } from 'store/index';
import { setLaguage } from 'store/slices/settings';
import locales from 'assets/locales/index.json';

const useLocale = () => {
  const dispatch = useDispatch();

  const laguage = useSelector((state) => state.settings.laguage);

  const init = () => {
    if (!window.localStorage.getItem('lang')) {
      const initData = isDev() ? envs.testInitData : window.Telegram.WebApp.initData;

      let language: 'ru' | 'en' = 'ru';

      try {
        const params = new window.URLSearchParams(initData);

        const user = params.get('user');

        const userJson = user && JSON.parse(user);

        language = userJson?.language_code === 'ru' ? 'ru' : 'en';
      } catch (e) {
        console.log('Error in init laguage: ', e);
      }

      dispatch(setLaguage(language));
    }
  };

  const locale = (key: string) => {
    if (!locales) {
      return '';
    }

    return (locales[laguage] as Record<string, string>)?.[key] || '';
  };

  return {
    init,
    locale,
  };
};

export default useLocale;
