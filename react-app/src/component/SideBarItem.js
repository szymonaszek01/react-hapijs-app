import styles from '../style';
import { useNavigate } from 'react-router-dom';

const SideBarItem = ({ icon, label, link, action }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (action) {
      action();
    }
    if (link) {
      navigate(link);
    }
  };

  return <div className={`w-full items-center justify-between ${styles.flexRow} cursor-pointer border-2 border-white sm:border-0 sm:group-hover:border-2 rounded-[4px] px-3 py-2 bg-transparent hover:bg-gray30Percentage`} onClick={onClick}>
    <p className={`text-white text-xs uppercase block sm:hidden sm:group-hover:block`}>{label}</p>
    {icon}
  </div>;
};

export default SideBarItem;