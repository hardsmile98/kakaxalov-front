import boostsImage from 'assets/images/boostsImage.webp'
import boostsText from 'assets/images/boostsText.svg'
import boostsIcon from 'assets/images/boostsIcon.svg'
import DailyBoosts from './Daily'
import Improvements from './Improvements'
import Paid from './Paid'
import Nft from './Nft'
import styles from './styles.module.css'

function Boosts () {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.textImage}
          src={boostsText}
          alt="boosts text"
        />

        <img
          className={styles.image}
          src={boostsImage}
          alt="boosts image"
        />
      </div>

      <div className={styles.head}>
        <img
          src={boostsIcon}
          alt="boosts icon"
        />

        <h2>
          Boosts
        </h2>
        <p>
          Прокачивай уровни буста и собирай больше КАКАХ
        </p>
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Eжеденевно
        </h5>

        <DailyBoosts />
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Бусты с прокачкой
        </h5>

        <Improvements />
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Бусты за покупку
        </h5>

        <Paid />
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Проверка NTF
        </h5>

        <Nft />
      </div>
    </div>
  )
}

export default Boosts
