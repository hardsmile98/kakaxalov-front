import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxa-init.gif'
import kakaxaTop from 'assets/images/kakaxa-top.webp'
import kakaxaBotoom from 'assets/images/kakaxa-bottom.webp'
import islandBig from 'assets/images/island-big.svg'
import islandOriginal from 'assets/images/island-original.svg'
import islandBlack from 'assets/images/island-black.svg'
import kakaxaCoin from 'assets/images/kakaxa-money.gif'
import bomb from 'assets/images/bomb.gif'
import styles from './styles.module.css'
import { useImagesPreload } from 'hooks'
import { Position } from 'constants/index'
import useGameplay from './useGameplay'

const stylesCoinMap: Record<string, string> = {
  [Position.rightTop]: styles.coinRightTop,
  [Position.rightBottom]: styles.coinRightBottom,
  [Position.leftTop]: styles.coinLeftTop,
  [Position.leftBottom]: styles.coinLeftBottom
}

const settings: Record<Position, {
  style: string
  image: string
}> = {
  [Position.initial]: {
    style: styles.kakaxa,
    image: kakaxaInit
  },
  [Position.leftBottom]: {
    style: styles.kakaxaLeftBottom,
    image: kakaxaBotoom
  },
  [Position.rightBottom]: {
    style: styles.kakaxaRightBottom,
    image: kakaxaBotoom
  },
  [Position.leftTop]: {
    style: styles.kakaxaLeftTop,
    image: kakaxaTop
  },
  [Position.rightTop]: {
    style: styles.kakaxaRightTop,
    image: kakaxaTop
  }
}

function Gameplay () {
  const {
    config,
    coinPosition,
    coinRef,
    position,
    setPosition,
    coin,
    isBomb
  } = useGameplay()

  useImagesPreload([
    bomb,
    kakaxaTop,
    kakaxaBotoom
  ])

  const setting = settings[position]

  return (
    <div className={styles.root}>
      <div className={styles.score}>
        <img src={coinIcon} alt="coin" />

        <span>{coin}</span>
      </div>

      <div className={styles.wrapper}>
        <span
          className={styles.clickableAreaLeftBottom}
          onClick={() => setPosition(Position.leftBottom)}
        />
        <span
          className={styles.clickableAreaLeftTop}
          onClick={() => setPosition(Position.leftTop)}
        />
        <span
          className={styles.clickableAreaRightBottom}
          onClick={() => setPosition(Position.rightBottom)}
        />
        <span
          className={styles.clickableAreaRightTop}
          onClick={() => setPosition(Position.rightTop)}
        />

        <img
          style={{ animationDuration: `${config.current.duration}ms` }}
          ref={coinRef}
          className={`${styles.coin} ${
            coinPosition !== null
            ? stylesCoinMap[coinPosition]
            : styles.none
          }`}
          src={isBomb ? bomb : kakaxaCoin}
          alt="coin"
        />

        <img
          className={styles.islandLeftTop}
          src={islandBlack}
          alt="island"
        />

        <img
          className={styles.islandLeftBottom}
          src={islandOriginal}
          alt="island"
        />

        <img
          className={styles.islandRightTop}
          src={islandBlack}
          alt="island"
        />

        <img
          className={styles.islandRightBottom}
          src={islandOriginal}
          alt="island"
        />

        <img
          className={setting.style}
          src={setting.image}
          alt="kakaxa"
        />

        <img
          className={styles.islandBig}
          src={islandBig}
          alt="island"
        />
      </div>
    </div>
  )
}

export default Gameplay
