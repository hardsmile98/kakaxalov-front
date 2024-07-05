import nftBoost from 'assets/images/nftBoost.webp';
import { useGetNftBonusQuery } from 'services/api';
import { useTonWallet } from '@tonconnect/ui-react';
import { Loader } from 'components';
import { useTelegram } from 'hooks';
import { nftLinks } from 'constants/index';
import styles from './styles.module.css';

function Nft() {
  const wallet = useTonWallet();

  const tg = useTelegram();

  const { isLoading, data } = useGetNftBonusQuery(wallet?.account.walletStateInit);

  if (!data) {
    return null;
  }

  const openCollectionLink = () => {
    tg.HapticFeedback.impactOccurred('light');

    tg.openLink(nftLinks.kakaxWorld);
  };

  return (
    <ul className={styles.root}>
      <li className={styles.red}>
        <div className={styles.button}>
          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              {isLoading
                ? <Loader />
                : (
                  <img
                    className={styles.boostImage}
                    src={nftBoost}
                    alt="nft"
                  />
                )}
            </div>

            <div>
              <div>У вас в арсенале</div>

              <div className={styles.description}>
                {`${data.nftCount} NFT`}
              </div>
            </div>
          </div>

          <button
            onClick={openCollectionLink}
            disabled={data.nftCount !== 0}
            type="button"
            className={styles.extra}
          >
            {data.nftCount === 0 ? 'Купить' : `X${data.bonus + 1}`}
          </button>
        </div>

        <div className={styles.notice}>
          1 NFT = $
          {data.bonusForNft}
          {' '}
          KKX POINTS к добыче (max $
          {data.maxNftBonus + 1}
          {' '}
          KKX POINTS добычи при $
          {data.maxNftCount}
          {' '}
          NFT)
        </div>
      </li>
    </ul>
  );
}

export default Nft;
