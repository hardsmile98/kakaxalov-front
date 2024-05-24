import Loader from 'components/Loader'
import styles from './styles.module.css'

interface BoostType {
  slug: string
  title: string
  description: string
  extra: string
  disabled: boolean
}

interface BoostProps {
  color: 'primary' | 'green' | 'red'
  loading?: boolean
  onClick?: () => void
  boost: BoostType & {
    iconStyle?: string
    icon?: string
  }
}

const stylesMap = {
  primary: styles.primary,
  green: styles.green,
  red: styles.red
}

function Boost ({ boost, loading, color, onClick }: BoostProps) {
  return (
    <li className={stylesMap[color]}>
      <button
        onClick={onClick}
        disabled={boost.disabled || loading}
        className={styles.button}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            {loading === true
              ? <Loader />
              : <img
                className={boost.iconStyle}
                src={boost.icon}
                alt={boost.title}
              />}
          </div>

          <div>
            <div>{boost.title}</div>
            <div className={styles.description}>{boost.description}</div>
          </div>
        </div>

        <div className={styles.extra}>{boost.extra}</div>
      </button>
    </li>
  )
}

export default Boost
