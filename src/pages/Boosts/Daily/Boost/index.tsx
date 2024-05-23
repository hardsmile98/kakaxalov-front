import dailyBoost1 from 'assets/images/dailyBoost1.webp'
import dailyBoost2 from 'assets/images/helth.svg'
import { BoostSlugs, type Boosts } from 'services'
import styles from './styles.module.css'
import { declOfWords } from 'helpers/index'

interface BoostButtonProps {
  index: number
  boost: Boosts['dailyList'][0]
  onStart: (slug: string) => void
}

const settingsMap: Record<string, { icon: string, iconStyle: string }> = {
  [BoostSlugs.devourer]: {
    icon: dailyBoost1,
    iconStyle: styles.iconDaily1
  },
  [BoostSlugs.energy]: {
    icon: dailyBoost2,
    iconStyle: styles.iconDaily2
  }
}

function BoostButton ({ index, boost, onStart }: BoostButtonProps) {
  return (<button
    key={boost.slug}
    className={styles.button}
    disabled={boost.disabled}
    onClick={() => onStart(boost.slug)}
  >
    <div className={styles.content}>
      <div className={styles.title}>
        {boost.title}
      </div>

      <div className={index % 2 === 0 ? styles.green : styles.red}>
        {boost.disabled
          ? 'Не доступно'
          : `Доступно - ${boost.availableCount} ${declOfWords(boost.availableCount, ['раз', 'раза', 'раз'])}`}
      </div>
    </div>

    <img
      className={settingsMap[boost.slug].iconStyle}
      src={settingsMap[boost.slug].icon}
      alt={boost.title}
    />
  </button>
  )
}

export default BoostButton
