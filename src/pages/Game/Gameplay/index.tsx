import coinIcon from 'assets/images/improvement2.webp'
import kakaxaInit from 'assets/images/kakaxaInit.gif'
import islandBig from 'assets/images/island-big.svg'
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
            <img className={styles.kakaxa} src={kakaxaInit} alt="kakaxa" />
            <img className={styles.islandBig} src={islandBig} alt="island" />
        </div>
    </div>
  )
}

export default Gameplay
