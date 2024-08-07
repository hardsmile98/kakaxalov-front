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
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred('light')}
            to="/referals"
          >
            <div>
              <img src={inviteIcon} alt="Invite" />
            </div>

            Invite
          </Link>
        </li>

        <li>
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred('light')}
            to="/boosts"
          >
            <div>
              <img src={boostIcon} alt="Boosts" />
            </div>

            Boosts
          </Link>
        </li>

        <li>
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred('light')}
            to="/leadboard"
          >
            <div>
              <img src={topIcon} alt="Leadboard" />
            </div>

            Leader
          </Link>
        </li>

        <li>
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred('light')}
            to="/earn"
          >
            <div>
              <img src={earnIcon} alt="Earn" />
            </div>

            Earn
          </Link>
        </li>

        <img className={styles.image} src={menu} alt="menu" />
      </ul>
    </div>
  );
}

export default Menu;
