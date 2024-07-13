import kakaxaIcon from 'assets/images/kakaxaIcon.webp';
import styles from './styles.module.css';

interface User {
  index?: number
  id: number | string
  name: string
  value: string
}

interface UserElementProps {
  user: User
}

function UserElement({ user }: UserElementProps) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {user.index !== undefined && user.index > 0 && (
          <div>
            {user.index}
          </div>
        )}

        <div className={styles.icon}>
          <img src={kakaxaIcon} alt="kakaxa" />
        </div>

        <div>
          {user.name}
        </div>
      </div>

      <div className={styles.value}>
        {user.value}
      </div>
    </div>
  );
}

export default UserElement;
