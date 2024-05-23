import skinBoost from 'assets/images/skinBoost.webp'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  skin = 'skin',
}

const boosts = [
  {
    slug: Slugs.skin,
    title: 'Выбор скина',
    description: '150$',
    extra: 'Купить'
  }
]

const iconsMap = {
  [Slugs.skin]: skinBoost
}

const stylesMap = {
  [Slugs.skin]: styles.boostImage
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
          disabled: false,
          icon: iconsMap[boost.slug],
          iconStyle: stylesMap[boost.slug]
        }} />
      ))}
    </ul>
  )
}

export default Paid
