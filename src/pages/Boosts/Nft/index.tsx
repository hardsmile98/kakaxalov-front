import nftBoost from 'assets/images/nftBoost.webp'
import styles from './styles.module.css'
import { Boost } from 'components'

enum Slugs {
  nft = 'nft',
}

const improvements = [
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
  [Slugs.nft]: styles.improvementImage
}

function Nft () {
  return (
    <ul className={styles.root}>
      {improvements.map((improvement) => (
        <Boost
        color="red"
        key={improvement.slug}
        boost={{
          ...improvement,
          icon: iconsMap[improvement.slug],
          iconStyle: stylesMap[improvement.slug]
        }} />
      ))}
    </ul>
  )
}

export default Nft
