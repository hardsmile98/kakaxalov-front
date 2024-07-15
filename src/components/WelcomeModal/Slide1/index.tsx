import { useLocale } from 'hooks';
import slide from 'assets/images/slide1.webp';
import bomb from 'assets/images/slide1Bomb.webp';
import kakaxa from 'assets/images/slide1Kakaxa.webp';
import person from 'assets/images/kakaxa-init.gif';
import styles from './styles.module.css';

function Slide1() {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h2>
          {locale('Immerse yourself in an exciting world and collect KKX POINTS')}
        </h2>
        <p>
          {locale('The more you collect, the bigger your league and place on the leaderboard')}
        </p>
      </div>

      <div className={styles.image}>
        <div className={styles.slideWrap}>
          <img className={styles.slide} src={slide} alt="slide" />

          <img className={styles.person} src={person} alt="person" />
        </div>

        <img className={styles.bomb} src={bomb} alt="bomb" />

        <img className={styles.kakaxa} src={kakaxa} alt="kakaxa" />
      </div>
    </div>
  );
}

export default Slide1;
