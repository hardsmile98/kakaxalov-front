import UserElement from './UserElement'
import styles from './styles.module.css'

interface UserListProps {
  type?: 'default' | 'numeric'
  list: Array<{
    id: number
    name: string
    value: string
  }> | undefined
}

function UserList ({ list, type = 'default' }: UserListProps) {
  console.log(list)

  return (
    <div className={styles.root}>
      {list?.length !== 0 && list !== undefined
        ? list.map((user, index) => <UserElement
        key={user.id}
        user={{
          ...user,
          index: type === 'numeric' ? index + 1 : undefined
        }}
       />)
        : 'Список пуст'}
    </div>
  )
}

export default UserList
