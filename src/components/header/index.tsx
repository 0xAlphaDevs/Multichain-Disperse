
import { ConnectButton } from '@particle-network/connectkit';
import Image from 'next/image';


import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-start']}>
          <div className={styles['nav-start-slogan']}>Multichain Disperse</div>
          {/* <Image src={logo} width={36} height={36} alt='logo'></Image> */}
        </div>
        <div className={styles['nav-end']}>
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
}
