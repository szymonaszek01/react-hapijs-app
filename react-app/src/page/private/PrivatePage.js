import styles from '../../style';
import { Logo, SideBar } from '../../component';
import { Outlet } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

const PrivatePage = () => {
  sessionStorage.removeItem('session-expired');
  const items = [{
    icon: <MdLogout className={`w-[22px] h-auto text-white`} />,
    label: 'Log out',
    action: () => {
      sessionStorage.removeItem('token');
    },
    link: '/',
  }];
  return (
    <div className={`${styles.page} ${styles.flexCol} ${styles.center}`}>
      <Logo />
      <SideBar items={items} />
      <Outlet />
    </div>
  );
};

export default PrivatePage;