import nftBoost from 'assets/images/nftBoost.webp';
import { useGetNftBonusQuery } from 'services/api';
import { useTonWallet } from '@tonconnect/ui-react';
import { Loader } from 'components';
import { useLocale, useTelegram } from 'hooks';
import { nftLinks } from 'constants/index';
import styles from './styles.module.css';

function Nft() {
  const { locale } = useLocale();

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
              <div>
                {locale('You are in the arsenal')}
              </div>

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
            {data.nftCount === 0 ? locale('Buy') : `X${data.bonus + 1}`}
          </button>
        </div>

        <div className={styles.notice}>
          <div>
            {`1 NFT = ${data.bonusForNft} KKX POINTS ${locale('to mining')} (max `}
            {`${data.maxNftBonus + 1} KKX POINTS ${locale('to mining at')} ${data.maxNftCount} NFT`}
          </div>

          <div>
            {locale('NFT will be displayed when your wallet is connected')}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Nft;
