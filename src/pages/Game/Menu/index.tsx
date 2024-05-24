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
            <div>
              <img src={inviteIcon} alt="Invite" />
            </div>

            Invite
          </Link>
        </li>

        <li>
          <Link to="/boosts">
            <div>
              <img src={boostIcon} alt="Boosts" />
            </div>

            Boosts
          </Link>
        </li>

        <li>
          <Link to="/leadboard">
            <div>
              <img src={topIcon} alt="Top100" />
            </div>

            Top100
          </Link>
        </li>

        <li>
          <Link to="/earn">
            <div>
              <img src={earnIcon} alt="Earn" />
            </div>

            Earn
          </Link>
        </li>

        <img className={styles.image} src={menu} alt="menu" />
      </ul>
    </div>
  )
}

export default Menu
