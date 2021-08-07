import styles from '../styles/Library.module.scss'
import LibraryInstrumentList from '../components/LibraryComponents/LibraryInstrumentList'
import { NextSeo } from 'next-seo'

const library = () => {
    return (
        <div>
            <NextSeo 
                title="Instrument Library" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <h1 className={styles.headingOne}>The Instrument Library</h1>
            <h5 className={styles.headingFive}>Browse all instruments included in Instrumentation Generation</h5>
            <LibraryInstrumentList cardSize='large'/>
        </div>
    )
}

export default library
