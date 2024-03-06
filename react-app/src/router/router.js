import { Outlet, Route, Routes } from 'react-router-dom';
import { HomePage } from '../page/public/home';
import Authenticator from './Authenticator';
import DashboardPage from '../page/private/dashboard/dashboard.page';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* public */}
        <Route index element={<HomePage />} />
        {/* private */}
        <Route element={<Authenticator />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
