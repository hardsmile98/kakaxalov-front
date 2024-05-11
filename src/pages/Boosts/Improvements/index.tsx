import improvement1 from 'assets/images/improvement1.webp'
import improvement2 from 'assets/images/improvement2.svg'
import styles from './styles.module.css'

enum Slugs {
  multiply = 'multiply',
  miner = 'miner',
  devourer = 'devourer',
}

const improvements = [
  {
    slug: Slugs.multiply,
    title: 'Улучшатель сбора',
    price: '300',
    level: 1
  },
  {
    slug: Slugs.miner,
    title: 'Время Минера',
    price: '500',
    level: 1
  },
  {
    slug: Slugs.devourer,
    title: 'Время Пожирателя',
    price: '500',
    level: 1
  }
]

const iconsMap = {
  [Slugs.multiply]: improvement1,
  [Slugs.miner]: improvement2,
  [Slugs.devourer]: improvement2
}

const stylesMap = {
  [Slugs.multiply]: styles.improvement1,
  [Slugs.miner]: undefined,
  [Slugs.devourer]: undefined
}

function Improvements () {
  return (
    <ul className={styles.root}>
      {improvements.map((improvement) => (
        <li key={improvement.slug}>
          <button className={styles.button}>
            <div className={styles.content}>
              <div className={styles.imageWrapper}>
                <img
                  className={stylesMap[improvement.slug]}
                  src={iconsMap[improvement.slug]}
                  alt={improvement.title}
                />
              </div>

              <div>
                <div>{improvement.title}</div>
                <div className={styles.price}>{improvement.price} КАКАХ</div>
              </div>
            </div>

            <div className={styles.level}>{improvement.level} LVL</div>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Improvements
