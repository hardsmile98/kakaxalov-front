import { useState } from 'react'
import dailyBoost1 from 'assets/images/dailyBoost1.webp'
import dailyBoost2 from 'assets/images/dailyBoost2.webp'
import dailyBoostModal1 from 'assets/images/dailyBoostModal1.webp'
import dailyBoostModal2 from 'assets/images/dailyBoostModal2.webp'
import { Button, Modal } from 'components'
import { useNavigate } from 'react-router'
import styles from './styles.module.css'

enum Slugs {
  devourer = 'devourer',
  miner = 'miner',
}

const boosts = [
  {
    slug: Slugs.devourer,
    title: 'Пожиратель',
    description: `Пожирает все на своем пути в течение 30 секунд, нажми на кнопку
    “Применить”, возвращайся в игру и собирай КАКАХИ`,
    extra: 'Доступно - 2 раза',
    disabled: false
  },
  {
    slug: Slugs.miner,
    title: 'Минер',
    description: `Всасывает в себя мины, которые оставлял когда-то, в течение 30 секунд,
    нажми на кнопку “Применить”, возвращайся в игру и собирай КАКАХИ`,
    extra: 'Доступно - 1 раз',
    disabled: false
  }
]

const iconsMap = {
  [Slugs.devourer]: dailyBoost1,
  [Slugs.miner]: dailyBoost2
}

const modalImages = {
  [Slugs.devourer]: dailyBoostModal1,
  [Slugs.miner]: dailyBoostModal2
}

function DailyBoosts () {
  const [startBoost, setStartBoost] = useState<null | Slugs>(null)

  const navigate = useNavigate()

  const setting = boosts.find(boost => boost.slug === startBoost)

  return (
    <>
      <div className={styles.root}>
        {boosts.map((boost, index) => (
          <button
            key={boost.slug}
            className={styles.button}
            onClick={() => setStartBoost(boost.slug)}
            disabled={boost.disabled}
          >
            <div className={styles.content}>
              <div className={styles.title}>{boost.title}</div>

              <div className={index % 2 === 0 ? styles.green : styles.red}>{boost.extra}</div>
            </div>

            <img
              className={styles.image}
              src={iconsMap[boost.slug]}
              alt={boost.title}
            />
          </button>
        ))}
      </div>

      <Modal
        isOpen={startBoost !== null}
        onClose={() => setStartBoost(null)}
      >
        {setting !== undefined && <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
           <img src={modalImages[setting?.slug]} alt={setting?.title} />

            <h4>
              {setting?.title}
            </h4>

            <p>
              {setting?.description}
            </p>
          </div>

          <Button onClick={() => navigate('/')}>
            Прменить
          </Button>
        </div>}
      </Modal>
    </>
  )
}

export default DailyBoosts
