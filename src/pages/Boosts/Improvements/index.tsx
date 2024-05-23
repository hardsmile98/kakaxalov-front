import improvement2 from 'assets/images/improvement2.svg'
import styles from './styles.module.css'
import { Boost } from 'components'
import { BoostSlugs, type Boosts } from 'services'

const iconsMap = {
  [BoostSlugs.devourer]: undefined,
  [BoostSlugs.energy]: improvement2
}

const stylesMap = {
  [BoostSlugs.devourer]: undefined,
  [BoostSlugs.energy]: styles.improvement2Image
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
          boost={{
            ...boost,
            icon: iconsMap[boost.slug],
            iconStyle: stylesMap[boost.slug]
          }}
        />
      ))}
    </ul>
  )
}

export default Improvements
