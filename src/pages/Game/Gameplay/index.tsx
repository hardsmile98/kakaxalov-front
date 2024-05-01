import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxaInit.gif'
import islandBig from 'assets/images/island-big.svg'
import islandOriginal from 'assets/images/island-original.svg'
import islandBlack from 'assets/images/island-black.svg'
import styles from './styles.module.css'

function Gameplay () {
  return (
    <div className={styles.root}>
        <div className={styles.score}>
            <img src={coinIcon} alt="coin" />

            <span>
                0
            </span>
        </div>

        <div className={styles.wrapper}>
            <img className={styles.islandLeftTop} src={islandBlack} alt="island" />
            <img className={styles.islandLeftBottom} src={islandOriginal} alt="island" />

            <img className={styles.islandRightTop} src={islandBlack} alt="island" />
            <img className={styles.islandRightBottom} src={islandOriginal} alt="island" />

            <img className={styles.kakaxa} src={kakaxaInit} alt="kakaxa" />
            <img className={styles.islandBig} src={islandBig} alt="island" />
        </div>
    </div>
  )
}

export default Gameplay
