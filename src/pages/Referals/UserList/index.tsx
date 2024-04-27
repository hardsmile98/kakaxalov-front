import UserElement from './UserElement'
import styles from './styles.module.css'

const userList = [
  {
    id: 1,
    name: 'Alex',
    value: '+5000KAKAX'
  },
  {
    id: 2,
    name: 'Nick',
    value: '+5000KAKAX'
  },
  {
    id: 3,
    name: 'Moty',
    value: '+5000KAKAX'
  }
]

function UserList () {
  return (
    <div className={styles.root}>
      {userList.map(user => <UserElement key={user.id} user={user} />)}
    </div>
  )
}

export default UserList
