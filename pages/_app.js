import '../utils/styles/globals.css'

import { AuthProvider } from '../utils/context/AuthProvider';

import NavLayout from '../components/NavLayout/NavLayout';



export default function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
    </AuthProvider>
  )
}
