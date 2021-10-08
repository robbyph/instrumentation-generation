import styles from '../styles/Library.module.scss'
import LibraryInstrumentList from '../components/LibraryComponents/LibraryInstrumentList'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'


const library = () => {
    const [sortingOption, setSortingOption] = useState('0')

    console.log('sorting option:' + sortingOption)
    
    return (
        <div>
            <NextSeo 
                    title="Instrument Library" 
                    description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
                />
                <h1 className={styles.headingOne}>The Instrument Library</h1>
                <h5 className={styles.headingFive}>Browse all instruments included in Instrumentation Generation</h5>
                <select className={styles.sortSelect} onChange={(e) => setSortingOption(e.target.value)}>
                    <option defaultValue value ="0">Random</option> 
                    <option value="1">A - Z</option>
                    <option value="2">Z - A</option>
                </select>
                <br/>
            <LibraryInstrumentList sortOption={sortingOption} />
        </div>
    )
}

export default library
