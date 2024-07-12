import loadingImage from 'assets/images/inviteImage.webp';
import Button from 'components/Button';
import { useLocale } from 'hooks';
import styles from './styles.module.css';

function ErrorPage() {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      <img className={styles.errorImage} src={loadingImage} alt="loading" />

      <p className={styles.errorText}>
        {locale('An error has occurred')}
      </p>

      <Button onClick={() => window.location.reload()}>
        {locale('Refresh app')}
      </Button>
    </div>
  );
}

export default ErrorPage;
