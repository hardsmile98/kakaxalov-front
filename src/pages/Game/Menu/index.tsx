/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import inviteIcon from 'assets/images/inviteIcon.svg';
import boostIcon from 'assets/images/boostsIcon.svg';
import topIcon from 'assets/images/topIcon.svg';
import earnIcon from 'assets/images/earnIcon.svg';
import menu from 'assets/images/menu.webp';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

function Menu() {
  const tg = useTelegram();

  return (
    <div className={styles.root}>
      <ul className={styles.menu}>
        <li>
          <Link to="/">
            Menu
          </Link>
        </li>

        <img className={styles.image} src={menu} alt="menu" />
      </ul>
    </div>
  );
}

export default Menu;
