import Head from './Head'
import Menu from './Menu'
import styles from './styles.module.css'

function Game () {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Head />

        <Menu />
      </div>
    </div>
  )
}

export default Game
