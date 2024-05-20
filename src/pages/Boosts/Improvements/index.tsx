import improvement2 from 'assets/images/improvement2.svg'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  energy = 'energy'
}

const boosts = [
  {
    slug: Slugs.energy,
    title: 'Время игры +5 сек.',
    description: '300 KAKAX',
    extra: '1 LVL'
  }
]

const iconsMap = {
  [Slugs.energy]: improvement2
}

const stylesMap = {
  [Slugs.energy]: styles.improvement2Image
}

function Improvements () {
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
