import improvement1 from 'assets/images/improvement1.webp'
import improvement2 from 'assets/images/improvement2.svg'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  multiply = 'multiply',
  miner = 'miner',
  devourer = 'devourer',
}

const improvements = [
  {
    slug: Slugs.multiply,
    title: 'Улучшатель сбора',
    description: '300 KAKAX',
    extra: '1 LVL'
  },
  {
    slug: Slugs.miner,
    title: 'Время Минера',
    description: '500 KAKAX',
    extra: '1 LVL'
  },
  {
    slug: Slugs.devourer,
    title: 'Время Пожирателя',
    description: '500 KAKAX',
    extra: '1 LVL'
  }
]

const iconsMap = {
  [Slugs.multiply]: improvement1,
  [Slugs.miner]: improvement2,
  [Slugs.devourer]: improvement2
}

const stylesMap = {
  [Slugs.multiply]: styles.improvement1Image,
  [Slugs.miner]: styles.improvement2Image,
  [Slugs.devourer]: styles.improvement2Image
}

function Improvements () {
  return (
    <ul className={styles.root}>
      {improvements.map((improvement) => (
        <Boost
          color="primary"
          key={improvement.slug}
          boost={{
            ...improvement,
            icon: iconsMap[improvement.slug],
            iconStyle: stylesMap[improvement.slug]
          }}
        />
      ))}
    </ul>
  )
}

export default Improvements
