import React, { useMemo, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import InputField from '@/components/include/InputField';
import FormProvider from '@/contexts/form/FormProvider';
import registerSchema from '@/validation/register';
import { yupResolver } from '@hookform/resolvers/yup';
import useAxios from '@/hooks/useAxios';
import Alert from '@/components/include/Alert';
import Loader from '@/components/include/Loader';

const Register = () => {

  const {api} = useAxios();
  const [message,setMessage] = useState("");
  
  const defaultValues = useMemo(() => ({
    name: '',
    email: '',
    password: '',
    confirm_password:''
  }), [])

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (params) => {
    
    // api call 
    const {data} = await api.post('register',params);
    
    if(data?.status_code == 100){
      reset();
      setMessage(data.message);
    }

    if(data?.status_code == 900){
      if(data?.data?.email){
        setError('email',{message:data?.data?.email})
      }
    }
  })


  return (
    <div className="w-full">
      <h1
        className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Create account
      </h1>
      {isSubmitting && <Loader/>}
      {message &&
        <>
        <Alert
          type="success"
          message={message}
        >
          <Link className='underline' to={'/login'}>Click here</Link> to login
          </Alert>       
        </>
      }
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          placeholder="e.g, jhon"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g, jhon@example.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="********"
        />
        <InputField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="********"
        />

        <button
          type='submit'
          className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"

        >
          Create account
        </button>
      </FormProvider>
      <hr className="my-8" />

      <p className="mt-4">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to="/login"
        >
          Already have an account? Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
