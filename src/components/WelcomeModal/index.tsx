/* eslint-disable react/no-array-index-key */
import { ReactNode, useState } from 'react';
import Button from 'components/Button';
import { useDispatch } from 'store/index';
import nextIcon from 'assets/images/nextIcon.svg';
import { setWelcomeModalOpened } from 'store/slices/settings';
import { useLocale } from 'hooks';
import light from 'assets/images/light.webp';
import styles from './styles.module.css';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

interface WelcomeModalProps {
  isOpen: boolean
}

const slideMap = {
  1: <Slide1 />,
  2: <Slide2 />,
  3: <Slide3 />,
} as Record<string, ReactNode>;

function WelcomeModal({ isOpen }: WelcomeModalProps) {
  const dispatch = useDispatch();

  const { locale } = useLocale();

  const [slide, setSlide] = useState(1);

  const finish = () => dispatch(setWelcomeModalOpened(false));

  const dots = new Array(Object.keys(slideMap).length).fill(0);

  return (
    <div className={`${styles.root} ${isOpen ? styles.visible : styles.hidden}`}>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.slide}>
            {slideMap[slide]}

            <img className={styles.light} src={light} alt="light" />

            <div className={styles.navigation}>
              {slide === 3 ? (
                <Button onClick={finish}>
                  {locale('Play')}
                </Button>
              ) : (
                <div className={styles.navWrapper}>
                  <div className={styles.dots}>
                    {dots.map((_, index) => (
                      <div
                        className={index + 1 === slide ? styles.activeDot : ''}
                        key={index}
                      />
                    ))}
                  </div>

                  <Button onClick={() => setSlide((prev) => prev + 1)}>
                    <img src={nextIcon} alt="next" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;
