import starIcon from 'assets/images/starIcon.svg'
import luckIcon from 'assets/images/luckIcon.svg'
import styles from './styles.module.css'

function Head () {
  return (
    <div className={styles.head}>
      <div className={styles.buttonsWrapper}>
        <button>
            <img src={luckIcon} alt='luck' />
            {'Clans: '}
            <span>
             $KAKAXA
            </span>
        </button>

        <button>
           <img src={starIcon} alt='star' />
           {'Tg: '}
            <span>
             $KAKAXA
            </span>
        </button>
      </div>

      <div className={styles.progressbar}>
        <span className={styles.line} style={{ width: '30%' }}></span>
        <span className={styles.score}>3527</span>
      </div>
    </div>
  )
}

export default Head
