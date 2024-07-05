/* eslint-disable react/no-array-index-key */

import coinIcon from 'assets/images/kakaxaCoin.webp';
import helth from 'assets/images/helth.svg';
import { useSelector } from 'store';
import { useGetProfileQuery } from 'services/api';
import { GameStatuses } from 'constants/index';
import { declOfWords, formatNumber } from 'helpers';
import styles from './styles.module.css';
import Timer from './Timer';

function Head() {
  const { data } = useGetProfileQuery(undefined);

  const gameTimer = useSelector((state) => state.game.gameTimer);
  const gameTime = useSelector((state) => state.game.gameTime);
  const gameStatus = useSelector((state) => state.game.gameStatus);

  const progress = gameTime !== 0 ? (gameTimer / gameTime) * 100 : 0;

  if (data === undefined) {
    return null;
  }

  const { amountEnergy } = data.user;
  const { energyRecoveryTimeSeconds } = data.user;
  const { useEneryTimestamp } = data.user;

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

          <span>
            {formatNumber(data?.user.score)}
            {' '}
            KKXP
          </span>
        </div>
      </div>

      <div className={styles.progressbar}>
        <span
          className={styles.line}
          style={{ width: `${progress}%` }}
        />

        <span className={styles.score}>
          {gameStatus !== GameStatuses.notRuning
            ? `${gameTimer} ${declOfWords(gameTimer, [
              'секунда',
              'секунды',
              'секунд',
            ])}`
            : null}
        </span>
      </div>
    </div>
  );
}

export default Head;
