import { useLocale } from 'hooks';
import UserElement from './UserElement';
import styles from './styles.module.css';

interface UserListProps {
  type?: 'default' | 'numeric'
  list: Array<{
    id: number
    name: string
    value: string
  }> | undefined
}

function UserList({ list, type = 'default' }: UserListProps) {
  const { locale } = useLocale();

  return (
    <div className={styles.root}>
      {list?.length !== 0 && list !== undefined
        ? list.map((user, index) => (
          <UserElement
            key={user.id}
            user={{
              ...user,
              index: type === 'numeric' ? index + 1 : undefined,
            }}
          />
        ))
        : locale('The list is empty')}
    </div>
  );
}

export default UserList;
