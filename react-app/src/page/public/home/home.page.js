import { SignInForm } from './index';

const HomePage = () => {
  return (
    <div className={`page bg-black-gradient flex-container center`}>
      <div className={`w-25 flex-container gap-normal`}>
        <h1>Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default HomePage;
