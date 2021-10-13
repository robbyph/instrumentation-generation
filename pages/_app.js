import Layout from '../components/Layout'
import '../styles/custom.scss'
import '../styles/globals.scss'
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
  
  
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
  )
}

export default MyApp
