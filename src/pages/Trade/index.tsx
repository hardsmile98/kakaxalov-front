import tradeImage from 'assets/images/tradeImage.webp'
import tradeIcon from 'assets/images/tradeIcon.svg'
import { Button } from 'components'
import styles from './styles.module.css'

function Referals () {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={tradeImage}
          alt="trade image"
        />
      </div>

      <div className={styles.head}>
        <img
          src={tradeIcon}
          alt="trade icon"
        />

        <h2>
          Trade
        </h2>
        <p>
          Заработай на КАКАХЕ обменивая свои монеты на токены
        </p>
      </div>

      <div className={styles.buttonWrapper}>
        <Button>
          Обменять
        </Button>
      </div>
    </div>
  )
}

export default Referals
