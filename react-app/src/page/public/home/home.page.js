import { SignInForm, SignUpForm } from './index';
import styles from '../../../style';
import { useEffect, useState } from 'react';
import { Logo, SessionExpired } from '../../../component';

const HomePage = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [expirationTime, setExpirationTime] = useState(null);
  const formStyle = `w-full ${signInForm ? 'sm:max-w-[375px]' : 'sm:max-w-[700px]'} ${styles.flexCol} justify-center items-center sm:items-start gap-11 sm:gap-5 px-8 xs:px-24 sm:px-0 mt-32 sm:mt-0`;

  useEffect(() => {
    const isSessionExpired = () => {
      setExpirationTime(sessionStorage.getItem('session-expired'));
    };
    isSessionExpired();
  }, []);


  return (
    <div className={`${styles.page} ${styles.flexCol} ${styles.center}`}>
      <Logo />
      {signInForm ? (<div className={formStyle}>
        {expirationTime ? <SessionExpired expirationTime={new Date(Date.now())} /> : ''}
        <h1 className={`${styles.title}`}>Sign in</h1>
        <SignInForm />
        <p
          className={`text-xs text-primary uppercase cursor-pointer`}>
          Don't have an account?
          <a className={'ml-1 text-xs text-secondary uppercase'} onClick={() => setSignInForm(false)}>
            Sign up
          </a>
        </p>
      </div>) : (<div className={formStyle}>
        <h1 className={`${styles.title}`}>Sign up</h1>
        <SignUpForm />
        <p
          className={`text-xs text-primary uppercase`}>
          Do you have an account?
          <a className={'ml-1 text-xs text-secondary uppercase cursor-pointer'}
             onClick={() => setSignInForm(true)}>
            Sign in
          </a>
        </p>
      </div>)}
    </div>
  );
};

export default HomePage;
