import styles from './styles.module.css'

interface BoostProps {
  color: 'primary' | 'green' | 'red'
  boost: {
    slug: string
    icon?: string
    iconStyle?: string
    title: string
    description: string
    extra: string
  }
}

const stylesMap = {
  primary: styles.primary,
  green: styles.green,
  red: styles.red
}

function Boost ({ boost, color }: BoostProps) {
  return (
    <li className={stylesMap[color]}>
      <button className={styles.button}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              className={boost.iconStyle}
              src={boost.icon}
              alt={boost.title}
            />
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
