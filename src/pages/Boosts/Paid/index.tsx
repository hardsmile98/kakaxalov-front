import robotBoost from 'assets/images/robotBoost.webp'
import skinBoost from 'assets/images/skinBoost.webp'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  robot = 'robot',
  skin = 'skin',
}

const boosts = [
  {
    slug: Slugs.robot,
    title: 'Говнарь Robot',
    description: '50$',
    extra: 'Купить'
  },
  {
    slug: Slugs.skin,
    title: 'Выбор скина',
    description: '150$',
    extra: 'Купить'
  }
]

const iconsMap = {
  [Slugs.robot]: robotBoost,
  [Slugs.skin]: skinBoost
}

const stylesMap = {
  [Slugs.robot]: styles.boost1Image,
  [Slugs.skin]: styles.boost2Image
}

function Paid () {
  return (
    <ul className={styles.root}>
      {boosts.map((boost) => (
        <Boost
        color="green"
        key={boost.slug}
        boost={{
          ...boost,
          icon: iconsMap[boost.slug],
          iconStyle: stylesMap[boost.slug]
        }} />
      ))}
    </ul>
  )
}

export default Paid
