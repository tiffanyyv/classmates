// For some global styles
// Keep styling inline using Style component with jsx tag

import '../utils/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
