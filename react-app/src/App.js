import Router from './router/router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer className={`font-poppins text-xs`}/>
      <Router />
    </div>
  );
};

export default App;
