import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxa-init.gif'
import kakaxaTop from 'assets/images/kakaxa-top.webp'
import kakaxaBotoom from 'assets/images/kakaxa-bottom.webp'
import islandBig from 'assets/images/island-big.svg'
import islandOriginal from 'assets/images/island-original.svg'
import islandBlack from 'assets/images/island-black.svg'
import kakaxaCoin from 'assets/images/kakaxa-money.gif'
import styles from './styles.module.css'
import { useState } from 'react'

enum Position {
  initial = 'initial',
  leftTop = 'leftTop',
  leftBottom = 'leftBottom',
  rightTop = 'rightTop',
  rightBottom = 'rightBottom'
}

type ISettingsMap = Record<Position, {
  style: string
  image: string
}>

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

function Gameplay () {
  const [position, setPosition] = useState(Position.initial)
  const [coin, setCoin] = useState(localStorage.getItem('coin') ?? 0)

  console.log(setCoin, setPosition)

  const setting = settings[position]

  return (
    <div className={styles.root}>
        <div className={styles.score}>
            <img src={coinIcon} alt="coin" />

            <span>
              {coin}
            </span>
        </div>

        <div className={styles.wrapper}>
            <img className={`${styles.coin} ${styles.coinRightTop}`} src={kakaxaCoin} alt='coin' />

            <img className={styles.islandLeftTop} src={islandBlack} alt="island" />
            <img className={styles.islandLeftBottom} src={islandOriginal} alt="island" />

            <img className={styles.islandRightTop} src={islandBlack} alt="island" />
            <img className={styles.islandRightBottom} src={islandOriginal} alt="island" />

            <img className={setting.style} src={setting.image} alt="kakaxa" />
            <img className={styles.islandBig} src={islandBig} alt="island" />
        </div>
    </div>
  )
}

export default Gameplay
