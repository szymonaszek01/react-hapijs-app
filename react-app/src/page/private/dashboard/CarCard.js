import styles from '../../../style';
import { Tag } from '../../../component';

const CarCard = ({ id, make, model, price, createdAt, equipment, categoryName }) => {
  const mainData = [{
    label: 'Category',
    value: categoryName,
  }, {
    label: 'Equipment',
    value: equipment,
  }, {
    label: 'Price',
    value: price + '$',
  }];

  return <div
    className={`w-full ${styles.flexCol} gap-10 px-4 py-6 rounded-[4px] box-shadow items-start justify-center border-secondary border-2`}>
    <div className={`w-full flex sm:flex-row flex-col justify-between items-center text-center`}>
      <h1 className={`text-2xl font-semibold uppercase text-primary`}>{make + ' ' + model}</h1>
      <p className={`text-xs font-semibold uppercase text-secondary`}>{createdAt}</p>
    </div>
    <div className={`w-full flex sm:flex-row flex-col gap-4 sm:gap-0 sm:justify-between items-center`}>
      {mainData.map((data, index) => <Tag key={`tag-${id}-${data.label}`} {...data} />)}
    </div>
    <button type={'button'} className={`${styles.button} w-full`}>Buy</button>
  </div>;
};

export default CarCard;