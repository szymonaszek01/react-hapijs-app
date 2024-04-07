import { logo } from '../assets';

const Logo = () => {
  return <img src={logo} alt={`logo`} className={`w-[125px] h-auto absolute mb-11 mt-7 mr-0 sm:mr-7 sm:right-0 top-0`} />;
};

export default Logo;