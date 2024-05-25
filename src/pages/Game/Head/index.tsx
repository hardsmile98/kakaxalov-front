import coinIcon from 'assets/images/kakaxaCoin.webp'
import helth from 'assets/images/helth.svg'
import { useSelector } from 'store'
import { useGetProfileQuery } from 'services/api'
import { GameStatuses } from 'constants/index'
import { declOfWords } from 'helpers'
import styles from './styles.module.css'
import Timer from './Timer'

function Head () {
  const { data } = useGetProfileQuery(undefined)

  const gameTimer = useSelector((state) => state.game.gameTimer)
  const gameStatus = useSelector((state) => state.game.gameStatus)

  if (data === undefined) {
    return null
  }

  const gameTime = data.user?.gameTime
  const amountEnergy = data.user.amountEnergy
  const energyRecoveryTimeSeconds = data.user.energyRecoveryTimeSeconds
  const useEneryTimestamp = data.user.useEneryTimestamp

  return (
    <div className={styles.head}>
      <div className={styles.wrapper}>
        <div className={styles.helthsWrapper}>
          <div className={styles.helths}>
            {amountEnergy > 0
              ? (
                  new Array(amountEnergy)
                    .fill(null)
                    .map((_, idx) => <img key={idx} src={helth} alt="helth" />)
                )
              : (
              <Timer
                energyRecoveryTimeSeconds={energyRecoveryTimeSeconds}
                useEneryTimestamp={useEneryTimestamp}
              />
                )}
          </div>
        </div>

        <div className={styles.coinWrapper}>
          <img className={styles.coin} src={coinIcon} alt="coin" />

          <span>{data?.user.currentScore} КАКАХ</span>
        </div>
      </div>

      <div className={styles.progressbar}>
        <span
          className={styles.line}
          style={{ width: `${(gameTimer / gameTime) * 100}%` }}
        />

        <span className={styles.score}>
          {gameStatus !== GameStatuses.notRuning
            ? `${gameTimer} ${declOfWords(gameTimer, [
                'секунда',
                'секунды',
                'секунд'
              ])}`
            : null}
        </span>
      </div>
    </div>
  )
}

export default Head
