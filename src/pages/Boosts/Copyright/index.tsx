import { Link } from 'react-router-dom';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

function Copyright() {
  const tg = useTelegram();

  const link = 'https://t.me/catdevelop';

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    tg.openLink(link);
  };

  return (
    <div className={styles.root}>
      <Link to={link} onClick={onLinkClick}>
        Разработка игры CatDev
      </Link>
    </div>
  );
}

export default Copyright;
