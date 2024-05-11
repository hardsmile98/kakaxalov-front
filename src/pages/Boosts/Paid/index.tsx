import robotBoost from 'assets/images/robotBoost.webp'
import skinBoost from 'assets/images/skinBoost.webp'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  robot = 'robot',
  skin = 'skin',
}

const improvements = [
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
  [Slugs.robot]: styles.improvement1Image,
  [Slugs.skin]: styles.improvement2Image
}

function Paid () {
  return (
    <ul className={styles.root}>
      {improvements.map((improvement) => (
        <Boost
        color="green"
        key={improvement.slug}
        boost={{
          ...improvement,
          icon: iconsMap[improvement.slug],
          iconStyle: stylesMap[improvement.slug]
        }} />
      ))}
    </ul>
  )
}

export default Paid
