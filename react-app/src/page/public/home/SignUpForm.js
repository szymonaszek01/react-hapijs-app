import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUpApi } from './auth.api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import styles from '../../../style';
import { BaseInput } from '../../../component';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
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
    repeatedPassword: {
      name: 'repeatedPassword',
      options: {
        required: 'Repeated password is required',
      },
    },
    phoneNumber: {
      name: 'phoneNumber',
      options: {
        required: 'Phone number is required',
      },
    },
    firstname: {
      name: 'firstname',
    },
    lastname: {
      name: 'lastname',
    },
    age: {
      name: 'age',
    },
  };

  const signUp = async (data) => {
    if (!errors.email && !errors.password && !errors.repeatedPassword && !errors.phoneNumber) {
      if (data.password !== data.repeatedPassword) {
        setError('repeatedPassword', { type: 'custom', message: 'Password is not equal repeated password' });
      } else {
        await signUpApi(data)
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
    }
  };

  return (<form className={`w-full ${styles.flexCol} gap-7`} onSubmit={handleSubmit(signUp)}>
    <div className={`w-full flex flex-col sm:flex-row gap-7`}>
      <BaseInput label={'Email'} type={'email'} autoComplete={'email'}
                 register={register(formConfig.email.name, formConfig.email.options)} error={errors.email} />
      <BaseInput label={'Password'} type={'password'} autoComplete={'new-password'}
                 register={register(formConfig.password.name, formConfig.password.options)} error={errors.password} />
      <BaseInput label={'Repeated password'} type={'password'}
                 register={register(formConfig.repeatedPassword.name, formConfig.repeatedPassword.options)}
                 error={errors.repeatedPassword} />
    </div>
    <div className={`w-full flex flex-col sm:flex-row gap-7`}>
      <BaseInput label={'Phone number'} type={'text'}
                 register={register(formConfig.phoneNumber.name, formConfig.phoneNumber.options)}
                 error={errors.phoneNumber} />
      <BaseInput label={'Firstname'} type={'text'}
                 register={register(formConfig.firstname.name, formConfig.firstname.options)}
                 error={errors.firstname} />
      <BaseInput label={'Lastname'} type={'text'}
                 register={register(formConfig.lastname.name, formConfig.lastname.options)} error={errors.lastname} />
    </div>
    <div className={`w-full ${styles.flexRow} gap-7`}>
      <BaseInput label={'Age'} type={'number'}
                 register={register(formConfig.age.name, formConfig.age.options)} error={errors.age} />
    </div>
    <button type={'submit'} className={`${styles.button}`}>Sign up</button>
  </form>);
};

export default SignUpForm;