import styles from '../../../style';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCarsApi } from '../../../api/cars.api';
import { CarCard } from './index';

const DashboardPage = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getCars = async () => {
      await getCarsApi()
        .then((response) => {
          setCars(response.data.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    };
    getCars().then(() => console.log(`cars loaded successfully`));
  }, [getCarsApi]);

  return (
    <div className={`${styles.page} ${styles.flexCol} ${styles.center}`}>
      <div className={`w-full sm:max-w-[700px] ${styles.flexCol} ${styles.center} gap-20 mt-32 px-5 sm:px-0`}>
        {cars.map(car => <CarCard key={`car-card-${car.id}`} id={car.id} model={car.model} equipment={car.equipment}
                                  make={car.make} price={car.price} categoryName={car.category_name}
                                  createdAt={car.created_at} />)}
      </div>
    </div>
  );
};

export default DashboardPage;
