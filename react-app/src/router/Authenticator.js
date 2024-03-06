import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Authenticator = () => {
  const location = useLocation();
  const token = Cookies.get('token') ?? null;
  console.log(`Cookie - token: ${token}`);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} state={{ from: location }} replace />
  );
};

export default Authenticator;