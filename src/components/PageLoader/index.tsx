import loadingImage from 'assets/images/earnImage.webp';
import { useLocale } from 'hooks';
import styles from './styles.module.css';

function PageLoader() {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      <img className={styles.loadingImage} src={loadingImage} alt="loading" />

      <p className={styles.loadingText}>
        {`${locale('Loading')}...`}
      </p>
    </div>
  );
}

export default PageLoader;
