import { useLocale } from 'hooks';
import bg from 'assets/images/slide2Bg.svg';
import person from 'assets/images/slide2Person.webp';
import styles from './styles.module.css';

function Slide2() {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h2>
          {locale('To catch, just tap on the screen')}
        </h2>
        <p>
          {locale('Use the tap on the side (top/bottom) from which the poop is flying, beware of bombs, otherwise you will lose your energy')}
        </p>
      </div>

      <div className={styles.image}>
        <div className={styles.slideWrap}>
          <img className={styles.bg} src={bg} alt="background" />

          <img className={styles.person} src={person} alt="person" />
        </div>
      </div>
    </div>
  );
}

export default Slide2;
