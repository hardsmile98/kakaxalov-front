import Gameplay from './Gameplay'
import Head from './Head'
import Menu from './Menu'
import styles from './styles.module.css'

function Game () {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Head />

        <Gameplay />

        <Menu />
      </div>
    </div>
  )
}

export default Game
