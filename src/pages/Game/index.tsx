import { useEffect } from 'react';
import Gameplay from './Gameplay';
import Head from './Head';
import Menu from './Menu';
import styles from './styles.module.css';

function Game() {
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 1_000);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Head />

        <Gameplay />

        <Menu />
      </div>
    </div>
  );
}

export default Game;
