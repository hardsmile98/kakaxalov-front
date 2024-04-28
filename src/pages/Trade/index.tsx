import tradeImage from 'assets/images/tradeImage.webp'
import tradeIcon from 'assets/images/tradeIcon.svg'
import styles from './styles.module.css'
import Form from './Form'

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

      <div className={styles.blockWrapper}>
        <h5>
          Обмен
        </h5>

        <Form />
      </div>
    </div>
  )
}

export default Referals
