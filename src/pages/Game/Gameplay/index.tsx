import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxaInit.gif'
import kakaxaTop from 'assets/images/kakaxaTop.webp'
import kakaxaBotoom from 'assets/images/kakaxaBottom.webp'
import islandBig from 'assets/images/island-big.svg'
import islandOriginal from 'assets/images/island-original.svg'
import islandBlack from 'assets/images/island-black.svg'
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

  const setting = settings[position]

  const onChange = () => {
    setPosition(prev => {
      if (prev === Position.initial) {
        return Position.leftBottom
      }

      return Position.initial
    })
  }

  return (
    <div className={styles.root}>
        <div className={styles.score}>
            <img src={coinIcon} alt="coin" />

            <span>
              0
            </span>
        </div>

        <div className={styles.wrapper} onClick={onChange}>
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
