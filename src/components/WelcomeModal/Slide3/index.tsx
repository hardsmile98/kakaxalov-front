import { useLocale } from 'hooks';
import person from 'assets/images/magnit.gif';
import bg from 'assets/images/slide3.svg';
import styles from './styles.module.css';

function Slide3() {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h2>
          {locale('Invite your friends and get boosted for quick collection')}
        </h2>
        <p>
          {locale('Soon, loot battles between each other will be introduced for even more exciting gameplay')}
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

export default Slide3;
