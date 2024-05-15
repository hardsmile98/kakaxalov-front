import { Link } from 'react-router-dom'
import inviteIcon from 'assets/images/inviteIcon.svg'
import boostIcon from 'assets/images/boostsIcon.svg'
import topIcon from 'assets/images/topIcon.svg'
import earnIcon from 'assets/images/earnIcon.svg'
import styles from './styles.module.css'
import menu from 'assets/images/menu.webp'

function Menu () {
  return (
    <div className={styles.root}>
      <ul className={styles.menu}>
        <li>
          <Link to="/referals">
            <img src={inviteIcon} alt="Invite" />
            Invite
          </Link>
        </li>

        <li>
          <Link to="/boosts">
            <img src={boostIcon} alt="Boosts" />
            Boosts
          </Link>
        </li>

        <li>
          <Link to="/leadboard">
            <img src={topIcon} alt="Top100" />
            Top100
          </Link>
        </li>

        <li>
          <Link to="/earn">
            <img src={earnIcon} alt="Earn" />
            Earn
          </Link>
        </li>

        <img className={styles.image} src={menu} alt="menu" />
      </ul>
    </div>
  )
}

export default Menu
