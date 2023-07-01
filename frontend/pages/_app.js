import '@/styles/globals.css'
import Header from '@/components/Header'
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/state';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {    //this is the root reducer
    auth: authSlice.reducer,
  }
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
