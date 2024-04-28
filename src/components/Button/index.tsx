import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

function Button ({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ''}`} {...props}>
        {children}
    </button>
  )
}

export default Button
