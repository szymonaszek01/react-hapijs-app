import { logo } from '../assets';

const Logo = () => {
  return <img src={logo} alt={`logo`} className={`w-[125px] h-auto relative sm:absolute mb-11 mt-7 ml-0 sm:ml-7 left-0 top-0`} />;
};

export default Logo;