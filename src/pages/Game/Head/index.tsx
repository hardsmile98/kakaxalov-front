import coinIcon from 'assets/images/improvement2.webp'
import helth from 'assets/images/helth.svg'
import styles from './styles.module.css'

function Head () {
  const countHelth = 3

  return (
    <div className={styles.head}>
      <div className={styles.wrapper}>
        <div className={styles.helthsWrapper}>
          <div className={styles.helths}>
            {new Array(countHelth).fill(null)
              .map((_, idx) => <img
                key={idx}
                src={helth}
                alt='helth'
              />)}
          </div>
        </div>

        <div className={styles.coinWrapper}>
          <img className={styles.coin} src={coinIcon} alt='coin' />
          <span>
            21.324 КАКАХ
          </span>
        </div>
      </div>

      <div className={styles.progressbar}>
        <span className={styles.line} style={{ width: '30%' }} />
        <span className={styles.score}>53 / 100</span>
      </div>
    </div>
  )
}

export default Head
