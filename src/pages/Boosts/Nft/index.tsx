import nftBoost from 'assets/images/nftBoost.webp'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  nft = 'nft',
}

const boosts = [
  {
    slug: Slugs.nft,
    title: 'У вас в арсенале',
    description: '5 NFT',
    extra: 'X2'
  }
]

const iconsMap = {
  [Slugs.nft]: nftBoost
}

const stylesMap = {
  [Slugs.nft]: styles.boostImage
}

function Nft () {
  return (
    <ul className={styles.root}>
      {boosts.map((boost) => (
        <Boost
        color="red"
        key={boost.slug}
        boost={{
          ...boost,
          disabled: false,
          icon: iconsMap[boost.slug],
          iconStyle: stylesMap[boost.slug]
        }} />
      ))}
    </ul>
  )
}

export default Nft
