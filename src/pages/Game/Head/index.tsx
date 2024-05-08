import coinIcon from 'assets/images/improvement2.webp'
import helth from 'assets/images/helth.svg'
import { useAppSelector } from 'store'
import { gameSettings } from 'constants/index'
import styles from './styles.module.css'

function Head () {
  const helths = useAppSelector(state => state.game.helths)
  const score = useAppSelector(state => state.game.score)
  const coin = useAppSelector(state => state.game.coin)

  return (
    <div className={styles.head}>
      <div className={styles.wrapper}>
        <div className={styles.helthsWrapper}>
          <div className={styles.helths}>
            {new Array(helths).fill(null)
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
            {score} КАКАХ
          </span>
        </div>
      </div>

      <div className={styles.progressbar}>
        <span
          className={styles.line}
          style={{ width: `${(coin / gameSettings.LIMIT_COLLECTION) * 100}%` }}
        />

        <span className={styles.score}>
          {coin} / {gameSettings.LIMIT_COLLECTION}
        </span>
      </div>
    </div>
  )
}

export default Head
