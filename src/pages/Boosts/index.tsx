import boostsImage from 'assets/images/boostsImage.webp'
import boostsIcon from 'assets/images/boostsIcon.svg'
import styles from './styles.module.css'

function Boosts () {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
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
      </div>

      <div className={styles.blockWrapper}>
        <h5>
          Бусты
        </h5>
      </div>
    </div>
  )
}

export default Boosts
