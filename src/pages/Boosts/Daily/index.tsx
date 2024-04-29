import dailyBoost1 from 'assets/images/dailyBoost1.webp'
import dailyBoost2 from 'assets/images/dailyBoost2.webp'
import styles from './styles.module.css'

function DailyBoosts () {
  return (
    <div className={styles.root}>
      <button className={styles.button}>
        <div className={styles.content}>
          <div className={styles.title}>Говноед</div>

          <div className={styles.green}>Доступно - 2 раза</div>
        </div>

        <img
          className={styles.image}
          src={dailyBoost1}
          alt="Говноед"
        />
      </button>

      <button className={styles.button} disabled>
        <div className={styles.content}>
          <div className={styles.title}>Минёр</div>

          <div className={styles.red}>Через 12 часов</div>
        </div>

        <img className={styles.image} src={dailyBoost2} alt="Минёр" />
      </button>
    </div>
  )
}

export default DailyBoosts
