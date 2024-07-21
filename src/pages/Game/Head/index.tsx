/* eslint-disable react/no-array-index-key */
import { memo } from 'react';
import coinIcon from 'assets/images/kakaxaCoin.webp';
import { useSelector } from 'store';
import { useGetProfileQuery } from 'services/api';
import { GameStatuses } from 'constants/index';
import { declOfWords, formatNumber } from 'helpers';
import { useLocale } from 'hooks';
import Setting from './Setting';
import Helths from './Helths';
import styles from './styles.module.css';

function Head() {
  const { data } = useGetProfileQuery(undefined);

  const gameTimer = useSelector((state) => state.game.gameTimer);
  const gameTime = useSelector((state) => state.game.gameTime);
  const gameStatus = useSelector((state) => state.game.gameStatus);

  const progress = gameTime !== 0 ? (gameTimer / gameTime) * 100 : 0;

  if (data === undefined) {
    return null;
  }

  const { locale } = useLocale();

  const { amountEnergy } = data.user;
  const { energyRecoveryTimeSeconds } = data.user;
  const { useEneryTimestamp } = data.user;

  return (
    <div className={styles.head}>
      <div className={styles.wrapper}>
        <div className={styles.helthsWrapper}>
          <div className={styles.helths}>
            <Helths
              energyRecoveryTimeSeconds={energyRecoveryTimeSeconds}
              useEneryTimestamp={useEneryTimestamp}
              amountEnergy={amountEnergy}
            />
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

      <div className={styles.progressWrap}>
        <div className={styles.progressbar}>
          <span
            className={styles.line}
            style={{ width: `${progress}%` }}
          />

          <span className={styles.score}>
            {gameStatus !== GameStatuses.notRuning
              ? `${gameTimer} ${declOfWords(gameTimer, [
                locale('1second'),
                locale('ManySeconds'),
                locale('LotSeconds'),
              ])}`
              : null}
          </span>
        </div>

        <div className={styles.settings}>
          <Setting />
        </div>
      </div>
    </div>
  );
}

export default memo(Head);
