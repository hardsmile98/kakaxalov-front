/* eslint-disable react/jsx-props-no-spreading */
import { type InputHTMLAttributes } from 'react';
import pasteIcon from 'assets/images/pasteIcon.svg';
import styles from './styles.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  withCopy?: boolean
};

function Input({ withCopy, ...props }: InputProps) {
  const { value } = props;

  const copyHandler = () => {
    if (value !== '') {
      window.navigator.clipboard.writeText(String(value));
    }
  };

  return (
    <div className={`${styles.inputWrapper} ${(withCopy === true) ? styles.inputWrapperWithCopy : ''}`}>
      <input {...props} />

      {withCopy === true
          && (
          <button
            className={styles.button}
            onClick={copyHandler}
            type="button"
          >
            <img src={pasteIcon} alt="icon" />
          </button>
          )}
    </div>
  );
}

export default Input;
