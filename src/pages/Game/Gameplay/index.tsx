import { memo } from 'react';
import coinIcon from 'assets/images/kakaxaCoin.webp';
import kakaxaInit from 'assets/images/kakaxa-init.gif';
import kakaxaTop from 'assets/images/kakaxa-top.webp';
import kakaxaBotom from 'assets/images/kakaxa-bottom.webp';
import islandBig from 'assets/images/island-big.svg';
import islandOriginal from 'assets/images/island-original.svg';
import islandBlack from 'assets/images/island-black.svg';
import kakaxaCoin from 'assets/images/kakaxa-money.gif';
import kingCoin from 'assets/images/kingCoin.gif';
import bombCoin from 'assets/images/bomb.gif';
import explosion from 'assets/images/explosion.gif';
import magnit from 'assets/images/magnit.gif';
import { useTelegram } from 'hooks';
import { GameStatuses, Position } from 'constants/index';
import { formatNumber } from 'helpers/index';
import styles from './styles.module.css';
import useGameplay from './useGameplay';

const stylesCoinMap: Record<string, string> = {
  [Position.rightTop]: styles.coinRightTop,
  [Position.rightBottom]: styles.coinRightBottom,
  [Position.leftTop]: styles.coinLeftTop,
  [Position.leftBottom]: styles.coinLeftBottom,
};

const settings: Record<
Position,
{
  style: string
  explosionStyles?: string
}
> = {
  [Position.initial]: {
    style: styles.kakaxa,
  },
  [Position.leftBottom]: {
    style: styles.kakaxaLeftBottom,
    explosionStyles: styles.explosionLeftBottom,
  },
  [Position.rightBottom]: {
    style: styles.kakaxaRightBottom,
    explosionStyles: styles.explosionRightBottom,
  },
  [Position.leftTop]: {
    style: styles.kakaxaLeftTop,
    explosionStyles: styles.explosionLeftTop,
  },
  [Position.rightTop]: {
    style: styles.kakaxaRightTop,
    explosionStyles: styles.explosionRightTop,
  },
};

function Gameplay() {
  const {
    game,
    isGameAvailable,
    config,

    coinRef,

    isButtonLoading,

    changePosition,
    runGame,
  } = useGameplay();

  const setting = settings[game.position];

  const tg = useTelegram();

  const startGame = () => {
    tg.HapticFeedback.impactOccurred('medium');

    runGame();
  };

  const kakaxaInitVisible = game.boost === null && game.position === Position.initial;

  const kakaxaTopVisible = [Position.leftTop, Position.rightTop].includes(game.position);

  const kakaxaBottomVisible = [Position.leftBottom, Position.rightBottom].includes(game.position);

  const magnitVisible = game.boost !== null;

  return (
    <div className={styles.root}>
      {game.gameStatus !== GameStatuses.notRuning
        ? (
          <div className={styles.score}>
            <img src={coinIcon} alt="coin" />
            <span>{formatNumber(game.coin)}</span>
          </div>
        )
        : (
          <div className={styles.playWrapper}>
            <button
              onClick={startGame}
              disabled={!isGameAvailable || isButtonLoading}
              type="button"
              aria-label="Start"
            />
          </div>
        )}

      <div className={styles.wrapper}>
        <span
          className={styles.clickableAreaLeftBottom}
          onClick={() => changePosition(Position.leftBottom)}
          aria-hidden="true"
        />
        <span
          className={styles.clickableAreaLeftTop}
          onClick={() => changePosition(Position.leftTop)}
          aria-hidden="true"
        />
        <span
          className={styles.clickableAreaRightBottom}
          onClick={() => changePosition(Position.rightBottom)}
          aria-hidden="true"
        />
        <span
          className={styles.clickableAreaRightTop}
          onClick={() => changePosition(Position.rightTop)}
          aria-hidden="true"
        />

        <div
          style={{ animationDuration: `${config.current.duration}ms` }}
          ref={coinRef}
          className={`${styles.coin} ${
            game.coinPosition !== null ? stylesCoinMap[game.coinPosition] : styles.none
          }`}
        >
          <img
            src={kakaxaCoin}
            alt="coin"
            style={{ display: game.coinType === 'coin' ? 'block' : 'none' }}
          />

          <img
            src={bombCoin}
            alt="coin"
            style={{ display: game.coinType === 'bomb' ? 'block' : 'none' }}
          />

          <img
            src={kingCoin}
            alt="coin"
            style={{ display: game.coinType === 'king' ? 'block' : 'none' }}
          />
        </div>

        <img className={styles.islandLeftTop} src={islandBlack} alt="island" />

        <img
          className={styles.islandLeftBottom}
          src={islandOriginal}
          alt="island"
        />

        <img className={styles.islandRightTop} src={islandBlack} alt="island" />

        <img
          className={styles.islandRightBottom}
          src={islandOriginal}
          alt="island"
        />

        <img
          className={`${game.isExplosionVisible ? styles.explosion : styles.none} 
            ${setting.explosionStyles}`}
          src={explosion}
          alt="explosion"
        />

        <div className={`${setting.style} ${styles.person}`}>
          <img
            src={kakaxaInit}
            style={{ display: kakaxaInitVisible ? 'block' : 'none' }}
            alt="kakaxa"
          />

          <img
            src={kakaxaTop}
            style={{ display: kakaxaTopVisible ? 'block' : 'none' }}
            alt="kakaxa"
          />

          <img
            src={kakaxaBotom}
            style={{ display: kakaxaBottomVisible ? 'block' : 'none' }}
            alt="kakaxa bottom"
          />

          <img
            src={magnit}
            style={{ display: magnitVisible ? 'block' : 'none' }}
            alt="magnit"
          />
        </div>

        <img className={styles.islandBig} src={islandBig} alt="island" />
      </div>
    </div>
  );
}

export default memo(Gameplay);
