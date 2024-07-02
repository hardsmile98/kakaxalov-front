import coinIcon from 'assets/images/kakaxaCoin.webp';
import kakaxaInit from 'assets/images/kakaxa-init.gif';
import kakaxaTop from 'assets/images/kakaxa-top.webp';
import kakaxaBotoom from 'assets/images/kakaxa-bottom.webp';
import islandBig from 'assets/images/island-big.svg';
import islandOriginal from 'assets/images/island-original.svg';
import islandBlack from 'assets/images/island-black.svg';
import kakaxaCoin from 'assets/images/kakaxa-money.gif';
import bomb from 'assets/images/bomb.gif';
import explosion from 'assets/images/explosion.gif';
import devourer from 'assets/images/devourer.gif';
import miner from 'assets/images/miner.gif';
import { useImagesPreload } from 'hooks';
import { GameStatuses, Position } from 'constants/index';
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
  image: string
}
> = {
  [Position.initial]: {
    style: styles.kakaxa,
    image: kakaxaInit,
  },
  [Position.leftBottom]: {
    style: styles.kakaxaLeftBottom,
    explosionStyles: styles.explosionLeftBottom,
    image: kakaxaBotoom,
  },
  [Position.rightBottom]: {
    style: styles.kakaxaRightBottom,
    explosionStyles: styles.explosionRightBottom,
    image: kakaxaBotoom,
  },
  [Position.leftTop]: {
    style: styles.kakaxaLeftTop,
    explosionStyles: styles.explosionLeftTop,
    image: kakaxaTop,
  },
  [Position.rightTop]: {
    style: styles.kakaxaRightTop,
    explosionStyles: styles.explosionRightTop,
    image: kakaxaTop,
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

  useImagesPreload([bomb, kakaxaTop, kakaxaBotoom, explosion, devourer, miner]);

  const setting = settings[game.position];

  const personImage = game.boost !== null ? devourer : setting.image;

  return (
    <div className={styles.root}>
      {game.gameStatus !== GameStatuses.notRuning
        ? (
          <div className={styles.score}>
            <img src={coinIcon} alt="coin" />
            <span>{game.coin}</span>
          </div>
        )
        : (
          <div className={styles.playWrapper}>
            <button
              onClick={runGame}
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

        <img
          style={{ animationDuration: `${config.current.duration}ms` }}
          ref={coinRef}
          className={`${styles.coin} ${
            game.coinPosition !== null ? stylesCoinMap[game.coinPosition] : styles.none
          }`}
          src={game.isBomb ? bomb : kakaxaCoin}
          alt="coin"
        />

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
          src={game.isExplosionVisible ? explosion : undefined}
          alt="explosion"
        />

        <img className={setting.style} src={personImage} alt="kakaxa" />

        <img className={styles.islandBig} src={islandBig} alt="island" />
      </div>
    </div>
  );
}

export default Gameplay;
