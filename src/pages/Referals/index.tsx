import inviteImage from 'assets/images/inviteImage.webp'
import inviteIcon from 'assets/images/inviteIcon.svg'
import styles from './styles.module.css'

function Referals () {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={inviteImage}
          alt="invite image"
        />
      </div>

      <div className={styles.head}>
        <img
          src={inviteIcon}
          alt="ivite icon"
        />

        <h2>
          Пригласи друзей и собирай КАКАХИ вместе
        </h2>
        <p>
          За каждого приведенного друга, ты получаешь по 5 тысяч КАКАХ
        </p>
      </div>

      <div className={styles.buttonWrapper}>
        <div>Пригласить</div>
      </div>
    </div>
  )
}

export default Referals
