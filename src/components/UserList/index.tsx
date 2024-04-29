import UserElement from './UserElement'
import styles from './styles.module.css'

interface UserListProps {
  type?: 'default' | 'numeric'
  list: Array<{
    id: number
    name: string
    value: string
  }>
}

function UserList ({ list, type = 'default' }: UserListProps) {
  return (
    <div className={styles.root}>
      {list.map((user, index) => <UserElement
        key={user.id}
        user={{
          ...user,
          index: type === 'numeric' ? index + 1 : undefined
        }}
       />)}
    </div>
  )
}

export default UserList