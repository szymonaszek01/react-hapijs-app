import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const Authenticator = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('token') ?? null;
  console.log(`Cookie - token: ${token}`);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} state={{ from: location }} replace />
  );
};

export default Authenticator;