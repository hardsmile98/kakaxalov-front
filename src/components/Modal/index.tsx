import { useRef, type ReactNode } from 'react';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  const tg = useTelegram();

  const backdropRef = useRef<null | HTMLDivElement>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const onModalClose = () => {
    tg.HapticFeedback.impactOccurred('light');

    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onBackdropClick}
      className={`${styles.root} ${isOpen ? styles.visible : styles.hidden}`}
      aria-hidden="true"
    >
      <div className={styles.modal}>
        <button
          type="button"
          onClick={onModalClose}
          className={styles.close}
        >
          &#x2715;
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
