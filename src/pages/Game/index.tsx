import { useEffect, useRef } from 'react';
import Gameplay from './Gameplay';
import Head from './Head';
import Menu from './Menu';
import styles from './styles.module.css';

function Game() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.wrapper}>
        <Head />

        <Gameplay />

        <Menu />
      </div>
    </div>
  );
}

export default Game;
