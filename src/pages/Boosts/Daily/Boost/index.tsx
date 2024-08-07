import dailyBoost1 from 'assets/images/dailyBoost1.svg';
import dailyBoost2 from 'assets/images/helth.svg';
import { BoostSlugs, type Boosts } from 'services';
import { declOfWords } from 'helpers/index';
import { useLocale } from 'hooks';
import styles from './styles.module.css';
import Timer from './Timer';

interface BoostButtonProps {
  index: number
  boost: Boosts['dailyList'][0]
  onStart: (slug: string) => void
}

const settingsMap: Record<string, { icon: string, iconStyle: string }> = {
  [BoostSlugs.magnit]: {
    icon: dailyBoost1,
    iconStyle: styles.iconDaily,
  },
  [BoostSlugs.energy]: {
    icon: dailyBoost2,
    iconStyle: styles.iconDaily,
  },
};

function BoostButton({ index, boost, onStart }: BoostButtonProps) {
  const { locale } = useLocale();

  return (
    <button
      key={boost.slug}
      className={styles.button}
      disabled={boost.disabled}
      onClick={() => onStart(boost.slug)}
      type="button"
    >
      <div className={styles.content}>
        <div className={styles.title}>
          {locale(boost.title)}
        </div>

        <div className={index % 2 === 0 ? styles.green : styles.red}>
          {boost.disabled && boost.useTimestamp !== null
            ? (
              <Timer
                useTimestamp={boost.useTimestamp}
                recoverySeconds={boost.recoverySeconds}
              />
            )
            : `${locale('Available')} - ${boost.availableCount} ${declOfWords(
              boost.availableCount,
              [locale('1Time'), locale('ManyTimes'), locale('LotTimes')],
            )}`}
        </div>
      </div>

      <img
        className={settingsMap[boost.slug].iconStyle}
        src={settingsMap[boost.slug].icon}
        alt={boost.title}
      />
    </button>
  );
}

export default BoostButton;
