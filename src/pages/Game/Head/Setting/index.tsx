import { useState } from 'react';
import settingIcon from 'assets/images/settingIcon.svg';
import ruFlag from 'assets/images/ru.webp';
import enFlag from 'assets/images/en.webp';
import { useDispatch } from 'store/index';
import { setLaguage } from 'store/slices/settings';
import { useSnackbar } from 'notistack';
import { useLocale } from 'hooks';
import styles from './styles.module.css';

function Setting() {
  const dispatch = useDispatch();

  const [isSettingOpened, setSettingOpened] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { locale } = useLocale();

  const onChangeLaguage = (newLanguage: 'ru' | 'en') => {
    dispatch(setLaguage(newLanguage));

    enqueueSnackbar(locale('Language changed successfully'), { variant: 'success' });

    setSettingOpened(false);
  };

  return (
    <>
      <button
        onClick={() => setSettingOpened((prev) => !prev)}
        className={styles.settingButton}
        type="button"
      >
        <img src={settingIcon} alt="setting" />
      </button>

      {isSettingOpened && (
        <ul className={styles.languages}>
          <li>
            <button
              type="button"
              onClick={() => onChangeLaguage('ru')}
            >
              <img src={ruFlag} alt="ru" />
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onChangeLaguage('en')}
            >
              <img src={enFlag} alt="en" />
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default Setting;
