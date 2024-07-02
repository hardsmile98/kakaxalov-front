import loadingImage from 'assets/images/inviteImage.webp';
import Button from 'components/Button';
import styles from './styles.module.css';

function ErrorPage() {
  return (
    <div className={styles.root}>
      <img className={styles.errorImage} src={loadingImage} alt="loading" />

      <p className={styles.errorText}>
        An error has occurred
      </p>

      <Button onClick={() => window.location.reload()}>
        Refresh page
      </Button>
    </div>
  );
}

export default ErrorPage;
