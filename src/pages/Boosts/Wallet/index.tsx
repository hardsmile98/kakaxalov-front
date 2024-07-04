import { useState } from 'react';

import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { ReactComponent as CheckIcon } from 'assets/images/checkIcon.svg';
import { Button, Input, Modal } from 'components';
import { useTelegram } from 'hooks';
import styles from './styles.module.css';

function Wallet() {
  const tg = useTelegram();

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const wallet = useTonWallet();

  const userFriendlyAddress = useTonAddress();

  const [tonConnectUI] = useTonConnectUI();

  const { open } = useTonConnectModal();

  const deleteWallet = async () => {
    setDeleteLoading(true);

    await tonConnectUI.disconnect();

    setDeleteLoading(false);

    setWalletModalOpen(false);
  };

  const connectWallet = () => {
    tg.HapticFeedback.impactOccurred('light');

    if (wallet) {
      setWalletModalOpen(true);
    } else {
      open();
    }
  };

  return (
    <>
      <button
        className={styles.root}
        type="button"
        onClick={connectWallet}
      >
        <div>
          <span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#FFFFFF" />
            </svg>
          </span>

          Подключить кошелек
        </div>

        <CheckIcon className={wallet ? styles.checked : styles.icon} />
      </button>

      <Modal
        onClose={() => setWalletModalOpen(false)}
        isOpen={isWalletModalOpen}
      >
        <div className={styles.wallet}>
          <h4>
            Ваш кошелек TON подключен
          </h4>

          <div className={styles.field}>
            <Input
              value={userFriendlyAddress}
              readOnly
              className={styles.walletInput}
              withCopy
            />

            <Button
              loading={isDeleteLoading}
              onClick={deleteWallet}
            >
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Wallet;
