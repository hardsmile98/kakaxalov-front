import { useRef, type ReactNode } from 'react'
import styles from './styles.module.css'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

function Modal ({ children, isOpen, onClose }: ModalProps) {
  const backdropRef = useRef<null | HTMLDivElement>(null)

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={backdropRef}
      onClick={onBackdropClick}
      className={`${styles.root} ${isOpen ? styles.visible : styles.hidden}`}
    >
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>&#x2715;</button>

        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
