import { type InputHTMLAttributes } from 'react'
import pasteIcon from 'assets/images/pasteIcon.svg'
import styles from './styles.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  withCopy?: boolean
}

function Input ({ withCopy, ...props }: InputProps) {
  const { value } = props

  const copyHandler = () => {
    if (value !== '') {
      void window.navigator.clipboard.writeText(String(value))
    }
  }

  return (
    <div className={`${styles.inputWrapper} ${(withCopy === true) ? styles.inputWrapperWithCopy : ''}`}>
        <input {...props} />

        {withCopy === true &&
          <button
           className={styles.button}
           onClick={copyHandler}
          >
            <img src={pasteIcon} alt='icon'/>
          </button>}
    </div>
  )
}

export default Input
