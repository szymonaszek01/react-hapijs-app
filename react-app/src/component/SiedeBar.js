import styles from '../style';
import { MdDehaze } from 'react-icons/md';
import { useState } from 'react';
import { SideBarItem } from './index';

const SideBar = ({ items }) => {
  const [menuActive, setMenuActive] = useState(false);

  return <div
    className={`group w-full sm:w-[4vw] sm:hover:w-[12vw] ${menuActive ? 'visible h-auto' : 'invisible'} sm:visible sm:h-screen sm:min-h-[100vh] bg-secondary box-shadow fixed left-0 top-0 ${styles.flexCol} px-3 sm:px-2 pt-2.5 pb-7 sm:pb-2.5 sm:items-center sm:hover:items-start`}>
    <MdDehaze className={`w-[32px] h-auto text-white cursor-pointer visible sm:hidden mb-7 sm:mb-0`}
              onClick={() => setMenuActive(!menuActive)} />
    {items.map((item, index) => <SideBarItem key={`side-bar-item-${index}`} {...item} />)}
  </div>;
};

export default SideBar;