// import { useState } from 'react';
import { signInApi } from './auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

const SignInForm = () => {
  const navigate = useNavigate();
  // ---- STEP 1 ---- replace useState with useForm
  // const [credentials, setCredentials] = useState({
  //   email: '',
  //   password: '',
  // });
  const { register, handleSubmit, formState: { errors } } = useForm();

  // ---- STEP 2 ---- pass function to handleSubmit
  const signIn = async (credentials) => {
    if (!errors.email && !errors.password && credentials.email && credentials.password) {
      await signInApi(credentials)
        .then((response) => {
          const { token } = response.data;
          Cookies.set('token', token, { expires: 3, secure: true });
          navigate('/dashboard');
          toast.success(`User signed in successfully!`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  // ---- STEP 3 ---- remove on change
  // const onChange = (e) => {
  //   let inputName = e.target.name;
  //   setCredentials({
  //     ...credentials,
  //     [inputName]: e.target.value,
  //   });
  // };

  // ---- STEP 4 ---- wrap html code in <form onSubmit={handleSubmit(your_function)}}></form>
  return (<form className={`w-100 flex-container text-primary gap-normal`} onSubmit={handleSubmit(signIn)}>
    <div className={`w-100 flex-container gap-small`}>
      <p className={`text-small ml-small`}>Email</p>
      <input type={`email`} autoComplete={`email`}
             className={`w-100`} {...register('email', { required: 'Email is required' })} />
      {errors.email && <p className={`error-text`}>{errors.email.message}</p>}
    </div>
    <div className={`w-100 flex-container gap-small`}>
      <p className={`text-small ml-small`}>Password</p>
      {/* ---- STEP 5 ---- remove 'name' property and 'onChange' event */}
      {/* ---- STEP 6 ---- add {...register('your_input_name', {validation})} */}
      <input type={`password`}
             autoComplete={`new-password`} {...register('password', {
        required: 'Password is required',
        min: {value: 8, message: 'Password too short'},
        max: {value: 8, message: 'Password too long'},
        pattern: {
          value: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
          message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        },
      })}
             className={`w-100`} />
      {/* ---- STEP 7 ---- show error using <p></p> or <span></span> */}
      {errors.password && <p className={`error-text`}>{errors.password.message}</p>}
    </div>
    {/* ---- STEP 8 ---- submit form */}
    <button type={'submit'} className={`w-25`} onClick={signIn}>Sign in</button>
  </form>);
};

export default SignInForm;
