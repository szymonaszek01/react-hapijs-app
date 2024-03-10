import styles from '../style';
import { MdErrorOutline } from '@react-icons/all-files/md/MdErrorOutline';

const BaseInput = ({ label, type, autoComplete, register, error }) => {
  return <div className={`w-full ${styles.flexCol} justify-center items-start`}>
    <p className={`text-secondary text-xxs uppercase ml-2`}>{label}</p>
    <input type={type ?? ''} autoComplete={autoComplete ?? ''}
           className={`${styles.input} mt-1.5`} {...register} />
    {error &&
      <div className={`w-full ${styles.flexRow} flex-wrap gap-2 justify-start items-center mt-3`}>
        <MdErrorOutline className={`w-[23px] h-auto text-red-600`} />
        <p className={`text-xxs text-red-600 font-semibold uppercase`}>{error.message}</p>
      </div>
    }
  </div>;
};

export default BaseInput;