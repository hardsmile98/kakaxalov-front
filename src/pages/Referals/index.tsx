import inviteImage from 'assets/images/inviteImage.webp'
import inviteIcon from 'assets/images/inviteIcon.svg'
import styles from './styles.module.css'
import { Input } from 'components'

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

      <div className={styles.linkWrapper}>
        <h5>
          Реферальная ссылка
        </h5>

        <Input
          value="https://t.me/kakaxalov_game_bot?userId=48285 https://t.me/kakaxalov_game_bot?userId=48285"
          readOnly
          withCopy
        />
      </div>

      <div className={styles.buttonWrapper}>
        <div>Пригласить</div>
      </div>
    </div>
  )
}

export default Referals
