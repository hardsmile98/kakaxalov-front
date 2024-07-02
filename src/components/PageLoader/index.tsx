import loadingImage from 'assets/images/earnImage.webp';
import styles from './styles.module.css';

function PageLoader() {
  return (
    <div className={styles.root}>
      <img className={styles.loadingImage} src={loadingImage} alt="loading" />

      <p className={styles.loadingText}>
        Loading...
      </p>
    </div>
  );
}

export default PageLoader;
