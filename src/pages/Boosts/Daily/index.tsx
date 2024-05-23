import dailyBoost2 from 'assets/images/helth.svg'
import dailyBoostModal1 from 'assets/images/dailyBoostModal1.webp'
import { Button, Modal } from 'components'
import styles from './styles.module.css'
import { BoostSlugs, type Boosts } from 'services'
import { useState } from 'react'
import BoostButton from './Boost'

const settingsMap: Record<string, { modalImage: string, modalImageStyle: string }> = {
  [BoostSlugs.devourer]: {
    modalImage: dailyBoostModal1,
    modalImageStyle: styles.modalImage1Style
  },
  [BoostSlugs.energy]: {
    modalImage: dailyBoost2,
    modalImageStyle: styles.modalImage2Style
  }
}

interface DailyBoostsProps {
  boosts?: Boosts['dailyList']
}

function DailyBoosts ({ boosts }: DailyBoostsProps) {
  const [startBoost, setStartBoost] = useState<null | string>(null)

  if (boosts === undefined) {
    return null
  }

  const setting = boosts.find(boost => boost.slug === startBoost)

  return (
    <>
      <div className={styles.root}>
        {boosts.map((boost, index) => <BoostButton
          key={boost.slug}
          boost={boost}
          index={index}
          onStart={(slug) => setStartBoost(slug)}
        />)}
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

          <Button>
            Прменить
          </Button>
        </div>}
      </Modal>
    </>
  )
}

export default DailyBoosts
