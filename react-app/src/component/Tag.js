import styles from '../style';

const Tag = ({ label, value }) => {
  return <div className={`w-full flex flex-col gap-1 ${styles.center}`}>
    <p className={`text-xxs font-semibold uppercase text-secondary ${!label ? 'hidden' : ''}`}>{label}</p>
    <p className={`text-xs font-semibold uppercase text-primary`}>{value}</p>
  </div>;
};

export default Tag;