import { Outlet, Route, Routes } from 'react-router-dom';
import { HomePage } from '../page/public/home';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* public */}
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
