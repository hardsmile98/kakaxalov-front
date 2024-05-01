import inviteIcon from 'assets/images/inviteIcon.svg'
import boostIcon from 'assets/images/boostsIcon.svg'
import topIcon from 'assets/images/topIcon.svg'
import tradeIcon from 'assets/images/tradeIcon.svg'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

function Game () {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <button>
            112313
          </button>
        </div>

          <ul className={styles.menu}>
            <li>
              <Link to="/referals">
                <img src={inviteIcon} alt='Invite'/>
                Invite
              </Link>
            </li>

            <li>
              <Link to="/boosts">
              <img src={boostIcon} alt='Boosts'/>
                Boosts
              </Link>
            </li>

            <li>
              <Link to="/leadboard">
              <img src={topIcon} alt='Top100'/>
                Top100
              </Link>
            </li>

            <li>
              <Link to="/trade">
              <img src={tradeIcon} alt='Trade'/>
                Trade
              </Link>
            </li>
          </ul>
      </div>
    </div>
  )
}

export default Game
