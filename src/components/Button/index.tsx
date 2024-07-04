/* eslint-disable react/jsx-props-no-spreading */
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useTelegram } from 'hooks';
import Loader from '../Loader';
import styles from './styles.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  loading?: boolean
};

function Button({
  children,
  loading,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const tg = useTelegram();

  const onClickHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (typeof onClick === 'function') {
      tg.HapticFeedback.impactOccurred('light');

      onClick(e);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled ?? loading}
      className={`${styles.button} ${className ?? ''}`}
      {...props}
      onClick={onClickHandle}
    >
      {loading === true ? <Loader /> : children}
    </button>
  );
}

export default Button;
