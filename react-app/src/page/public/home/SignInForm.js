import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BaseInput } from '../../../component';
import { signInApi } from '../../../api/auth.api';
import { toast } from 'react-toastify';
import styles from '../../../style';

const SignInForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formConfig = {
    email: {
      name: 'email',
      options: { required: 'Email is required' },
    },
    password: {
      name: 'password',
      options: {
        required: 'Password is required',
        pattern: {
          value: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
          message: 'Password must contain at least: eight characters, one lowercase letter, one uppercase letter, one digit and one special character',
        },
      },
    },
  };

  const signIn = async (credentials) => {
    if (!errors.email && !errors.password) {
      await signInApi(credentials)
        .then((response) => {
          const { token } = response.data;
          sessionStorage.setItem('token', token);
          navigate('/dashboard');
          toast.success(`User signed in successfully!`)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  return (<form className={`w-full ${styles.flexCol} gap-7`} onSubmit={handleSubmit(signIn)}>
    <BaseInput label={'Email'} type={'email'} autoComplete={'email'}
               register={register(formConfig.email.name, formConfig.email.options)} error={errors.email} />
    <BaseInput label={'Password'} type={'password'} autoComplete={'new-password'}
               register={register(formConfig.password.name, formConfig.password.options)} error={errors.password} />
    <button type={'submit'} className={`${styles.button}`}>Sign in</button>
  </form>);
};

export default SignInForm;
