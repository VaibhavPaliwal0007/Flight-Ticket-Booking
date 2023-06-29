import Image from 'next/image'
import { Inter } from 'next/font/google'

import SignInForm from '@/components/auth/SignInForm'
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/state';
import { Provider } from 'react-redux';

const store=configureStore({
  reducer:{    //this is the root reducer
    auth:authSlice.reducer,
  }
});

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <Provider store={store}>
       <SignInForm/>
     </Provider>
  )
}
