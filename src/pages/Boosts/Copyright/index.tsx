import { Link } from 'react-router-dom';
import { useLocale, useTelegram } from 'hooks';
import styles from './styles.module.css';

function Copyright() {
  const tg = useTelegram();

  const link = 'https://t.me/catdevelop';

  const { locale } = useLocale();

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    tg.openTelegramLink(link);
  };

  return (
    <div className={styles.root}>
      <Link to={link} onClick={onLinkClick}>
        {locale('Game development CatDev')}
      </Link>
    </div>
  );
}

export default Copyright;
