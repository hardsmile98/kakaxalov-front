import improvement1 from 'assets/images/improvement1.webp'
import improvement2 from 'assets/images/improvement2.webp'
import improvement3 from 'assets/images/improvement3.webp'
import styles from './styles.module.css'

enum Slugs {
  multiply = 'multiply',
  coin = 'coin',
  robot = 'robot'
}

const improvements = [
  {
    slug: Slugs.multiply,
    title: 'Удвоение КАКАХИ',
    price: '4.000',
    level: 1
  },
  {
    slug: Slugs.coin,
    title: 'КАKAХА COIN',
    price: '10.000',
    level: 1
  },
  {
    slug: Slugs.robot,
    title: 'Говнарь Robot',
    price: '100.000',
    level: 1
  }
]

const iconsMap = {
  [Slugs.multiply]: improvement1,
  [Slugs.coin]: improvement2,
  [Slugs.robot]: improvement3
}

function Improvements () {
  return (
    <ul className={styles.root}>
      {improvements.map((improvement) => (
        <li key={improvement.slug}>
          <button className={styles.button}>
            <div className={styles.content}>
              <div className={styles.imageWrapper}>
                <img src={iconsMap[improvement.slug]} alt={improvement.title} />
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
