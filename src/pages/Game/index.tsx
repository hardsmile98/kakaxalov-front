import { Link } from 'react-router-dom'

function Game () {
  return (
    <div>
      <Link to="/boosts">Boosts</Link>
      <Link to="/referals">Referals</Link>
      <Link to="/leadboard">Top 100</Link>
      <Link to="/trade">Trade</Link>
    </div>
  )
}

export default Game
