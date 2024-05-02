import { useCallback, useEffect, useRef, useState } from 'react'
import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxa-init.gif'
import kakaxaTop from 'assets/images/kakaxa-top.webp'
import kakaxaBotoom from 'assets/images/kakaxa-bottom.webp'
import islandBig from 'assets/images/island-big.svg'
import islandOriginal from 'assets/images/island-original.svg'
import islandBlack from 'assets/images/island-black.svg'
import kakaxaCoin from 'assets/images/kakaxa-money.gif'
import styles from './styles.module.css'
import { randomInteger } from 'helpers/index'

enum Position {
  initial = 'initial',
  leftTop = 'leftTop',
  leftBottom = 'leftBottom',
  rightTop = 'rightTop',
  rightBottom = 'rightBottom',
}

const positionArray = [
  Position.leftBottom,
  Position.leftTop,
  Position.rightBottom,
  Position.rightTop
]

type ISettingsMap = Record<
Position,
{
  style: string
  image: string
}
>

const stylesCoinMap: Record<string, string> = {
  [Position.rightTop]: styles.coinRightTop,
  [Position.rightBottom]: styles.coinRightBottom,
  [Position.leftTop]: styles.coinLeftTop,
  [Position.leftBottom]: styles.coinLeftBottom
}

const settings: ISettingsMap = {
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

const COIN_LS = 'coin'

function Gameplay () {
  const [position, setPosition] = useState(Position.initial)
  const [coin, setCoin] = useState(localStorage.getItem(COIN_LS) ?? 0)
  const [coinPosition, setCoinPosition] = useState<null | Position>(null)

  const coinPositionRef = useRef(coinPosition)
  coinPositionRef.current = coinPosition

  const positionRef = useRef(position)
  positionRef.current = position

  const timeoutRef = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    localStorage.setItem(COIN_LS, String(coin))
  }, [coin])

  const check = () => {
    if (positionRef.current === coinPositionRef.current) {
      setCoin(prev => +prev + 1)
    }

    setCoinPosition(null)

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const generateCoin = useCallback(() => {
    const randomIndex = randomInteger(0, positionArray.length - 1)

    setCoinPosition(positionArray[randomIndex])

    setTimeout(() => check(), randomInteger(800, 1_500))
  }, [])

  useEffect(() => {
    if (timeoutRef.current === null && coinPosition === null) {
      timeoutRef.current = setTimeout(
        () => generateCoin(),
        randomInteger(2_000, 5_000)
      )
    }
  }, [generateCoin, coinPosition])

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

        {coinPosition !== null && <img
          className={`${styles.coin} ${
            coinPosition !== null
            ? stylesCoinMap[coinPosition]
            : styles.none
          }`}
          src={kakaxaCoin}
          alt="coin"
        />}

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

        <img className={setting.style} src={setting.image} alt="kakaxa" />
        <img className={styles.islandBig} src={islandBig} alt="island" />
      </div>
    </div>
  )
}

export default Gameplay
