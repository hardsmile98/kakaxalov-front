import improvement2 from 'assets/images/improvement2.svg'
import styles from './styles.module.css'
import { Boost } from 'components'
import { BoostSlugs, type Boosts } from 'services'

const settingsMap: Record<string, { icon: string, iconStyle: string }> = {
  [BoostSlugs.energy]: {
    icon: improvement2,
    iconStyle: styles.improvement2Image
  }
}

interface ImprovementsProps {
  boosts?: Boosts['improveList']
}

function Improvements ({ boosts }: ImprovementsProps) {
  if (boosts?.length === 0 || boosts === undefined) {
    return null
  }

  return (
    <ul className={styles.root}>
      {boosts.map((boost) => (
        <Boost
          color="primary"
          key={boost.slug}
          onClick={() => {}}
          boost={{
            ...boost,
            icon: settingsMap[boost.slug].icon,
            iconStyle: settingsMap[boost.slug].iconStyle
          }}
        />
      ))}
    </ul>
  )
}

export default Improvements
