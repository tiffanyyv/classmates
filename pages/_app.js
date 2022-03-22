// import global CSS
import '../utils/styles/globals.css'

// import contexts
import { AuthProvider } from '../utils/context/AuthProvider';

// import layout components
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
