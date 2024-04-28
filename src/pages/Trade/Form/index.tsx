import { Button } from 'components'
import changeIcon from 'assets/images/changeIcon.svg'
import useTrade from './useTrade'
import styles from './styles.module.css'

function Form () {
  const {
    getCoin,
    sentCoin,
    setSentCoin,
    config,
    changeTradeType
  } = useTrade()

  const isDisabled = +sentCoin <= 0

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.wrapper}>
      <div>
        <div className={styles.head}>
          <p>Вы платите</p>

          <p className={styles.maxSum}>
            <span>Макс.:</span> {config.max} {config.sentSlug}
          </p>
        </div>

        <div className={styles.inputWrapper}>
          <input
           value={sentCoin}
           onChange={(e) => setSentCoin(e.target.value)}
           type="text" />
          <span>{config.sentSlug}</span>
        </div>

        <p className={styles.rate}>
          1 {config.sentSlug} = {config.rate} {config.getSlug}
        </p>
      </div>

      <div className={styles.toggleWrapper}>
        <button type="button" onClick={changeTradeType}>
          <img src={changeIcon} alt='change icon' />
        </button>
      </div>

      <div>
        <div className={styles.head}>
          <p>Вы получите</p>
        </div>

        <div className={styles.inputWrapper}>
          <input
           value={getCoin}
           readOnly
           type="text" />
          <span>{config.getSlug}</span>
        </div>
      </div>
      </div>

      <Button type="submit" disabled={isDisabled}>
        Обменять
      </Button>
    </form>
  )
}

export default Form
