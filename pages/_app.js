import Layout from '../components/Layout'
import '../styles/custom.scss'
import '../styles/globals.scss'
import { CookiesProvider } from "react-cookie"
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  
  
    return (
        <CookiesProvider>
            <Layout>
            <DefaultSeo 
            title="Instrumentation Generation" 
            description="A tool for composers to randomly generate groups of instruments to help jumpstart creativity, as well as learn about new instruments."
            openGraph={{
                images: [
                    {
                        url: '/images/header.jpg',
                        width: 800,
                        height: 600,
                        alt: "Robby's Instrumentation Generation",
                    }
                ],
                site_name: "Instrumentation Generation"
            }}
            />
                <Component {...pageProps} />
            </Layout>
        </CookiesProvider>
  )
}

export default MyApp
