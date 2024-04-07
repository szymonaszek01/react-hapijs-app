import { MdErrorOutline } from 'react-icons/md';

const SessionExpired = ({ expirationTime }) => {
  return <div
    className={`w-full flex flex-col sm:flex-row px-3 py-4 border-secondary border-2 rounded-[4px] box-shadow justify-center items-center gap-4 mb-3`}>
    <MdErrorOutline className={`w-[43px] h-auto text-secondary`} />
    <span
      className={`text-xs text-primary uppercase font-semibold leading-6 cursor-default`}>Your session expired at {expirationTime.toLocaleString()}. Please, try sign in again.</span>
  </div>;
};

export default SessionExpired;