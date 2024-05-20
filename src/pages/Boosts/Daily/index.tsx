import { useState } from 'react'
import dailyBoost1 from 'assets/images/dailyBoost1.webp'
import dailyBoost2 from 'assets/images/helth.svg'
import dailyBoostModal1 from 'assets/images/dailyBoostModal1.webp'
import { Button, Modal } from 'components'
import { useNavigate } from 'react-router'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { setBoost } from 'store/slices/game'

enum Slugs {
  devourer = 'devourer',
  energy = 'energy',
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
    slug: Slugs.energy,
    title: 'Энергия',
    description: 'Восстанавливает 1 единицу энергии',
    extra: 'Через 3 часа 20 мин',
    disabled: true
  }
]

const settingsMap = {
  [Slugs.devourer]: {
    icon: dailyBoost1,
    iconStyle: styles.iconDaily1,
    modalImage: dailyBoostModal1,
    modalImageStyle: styles.modalImage1Style
  },
  [Slugs.energy]: {
    icon: dailyBoost2,
    iconStyle: styles.iconDaily2,
    modalImage: dailyBoost2,
    modalImageStyle: styles.modalImage2Style
  }
}

function DailyBoosts () {
  const dispatch = useDispatch()

  const [startBoost, setStartBoost] = useState<null | Slugs>(null)

  const navigate = useNavigate()

  const setting = boosts.find(boost => boost.slug === startBoost)

  const onBoostEnable = (slug: string) => {
    dispatch(setBoost(slug))
    navigate('/')
  }

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
              className={settingsMap[boost.slug].iconStyle}
              src={settingsMap[boost.slug].icon}
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
            <img
              src={settingsMap[setting?.slug].modalImage}
              className={settingsMap[setting?.slug].modalImageStyle}
              alt={setting.title} />

            <h4>
              {setting.title}
            </h4>

            <p>
              {setting.description}
            </p>
          </div>

          <Button onClick={() => onBoostEnable(setting.slug)}>
            Прменить
          </Button>
        </div>}
      </Modal>
    </>
  )
}

export default DailyBoosts
