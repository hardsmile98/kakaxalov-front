import nftBoost from 'assets/images/nftBoost.webp';
import { Boost } from 'components';
import { useGetNftBonusQuery } from 'services/api';
import { useTonWallet } from '@tonconnect/ui-react';
import styles from './styles.module.css';

function Nft() {
  const wallet = useTonWallet();

  const { isLoading, data } = useGetNftBonusQuery(wallet?.account.walletStateInit);

  if (!data) {
    return null;
  }

  return (
    <ul className={styles.root}>
      <Boost
        color="red"
        loading={isLoading}
        boost={{
          slug: 'nft',
          title: 'У вас в арсенале',
          notice: `1 NFT = ${data.bonusForNft} $KKX к добыче (max ${data.maxNftBonus + 1} $KKX добычи при ${data.maxNftCount} NFT)`,
          disabled: true,
          icon: nftBoost,
          description: `${data.nftCount} NFT`,
          extra: `X${data.bonus + 1}`,
          iconStyle: styles.boostImage,
        }}
      />

    </ul>
  );
}

export default Nft;
