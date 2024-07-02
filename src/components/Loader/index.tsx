import styles from './styles.module.css';

interface LoaderProps {
  size?: number
  width?: number
}

function Loader({ size = 24, width = 4 }: LoaderProps) {
  return (
    <span
      style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${width}px` }}
      className={styles.loader}
    />
  );
}

export default Loader;
