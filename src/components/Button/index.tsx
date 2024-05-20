import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import Loader from '../Loader'
import styles from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  loading?: boolean
}

function Button ({ children, loading, className, disabled, ...props }: ButtonProps) {
  return (
    <button disabled={disabled ?? loading} className={`${styles.button} ${className ?? ''}`} {...props}>
        {loading === true ? <Loader /> : children}
    </button>
  )
}

export default Button
