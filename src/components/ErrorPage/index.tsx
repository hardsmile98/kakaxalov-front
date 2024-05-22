import loadingImage from 'assets/images/inviteImage.webp'
import styles from './styles.module.css'
import Button from 'components/Button'

function ErrorPage () {
  return (
    <div className={styles.root}>
        <img className={styles.errorImage} src={loadingImage} alt="loading image" />

        <p className={styles.errorText}>
          An error has occurred
        </p>

        <Button onClick={() => window.location.reload()}>
          Refresh page
        </Button>
    </div>
  )
}

export default ErrorPage
