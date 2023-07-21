import React, { useEffect } from 'react';

import { useRef , useState} from "react";
import { login, loginByToken } from '@/pages/api/authentication';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setLogin } from '@/state';
import Alert from '../Alert';

export default function SignInForm(props) {

  const [isError , setisError ] = useState("");

  console.log(isError.length);

  const emailInput = useRef();
  const passwordInput = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [passValidate, setPassValidate] = useState(false);

    const passHandler = (value) => {
        if (
                value.toLowerCase().includes("123") ||
                value.toLowerCase().includes("0000") ||
                value.length <= 7
            ) {
                setPassValidate(false);
                // throw new Error("Please enter a strong password!!");
                // setPassValidate(false);
            }
        else
        {
            setPassValidate(true);
        }
    }

  const loginHandler = async (e) => {
    try {
      e.preventDefault();

      const data = {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      };

      const res = await login(data);
      dispatch(setLogin(res.token));
      localStorage.setItem("jwt" , res.token);
      router.push('/home');
    } catch (error) {
      setisError(error.message);
      // console.log("here", error)
      // alert(error.message);
    }
  };



  return (
      <section className="bg-gray-50 dark:bg-gray-900">
        {isError.length>0 && <Alert message = {isError} />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={loginHandler} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  ref={emailInput}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  ref={passwordInput}
                  onChange={(e) => passHandler(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <Link href="/home">
                <button
                  type="submit"
                  onClick={loginHandler}
                  className="bg-gray-800 text-white w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled = {!passValidate}
                >
                  Sign in
                </button>
              </Link>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sign in as Admin{' '}
                <Link href="/signinadmin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>)
  
};

