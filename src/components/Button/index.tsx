import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

function Button ({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
        {children}
    </button>
  )
}

export default Button
