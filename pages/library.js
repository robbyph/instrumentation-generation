import styles from '../styles/Library.module.scss'
import LibraryInstrumentList from '../components/LibraryComponents/LibraryInstrumentList'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import {Row, Col, Container} from 'react-bootstrap'


const library = () => {
    const [sortingOption, setSortingOption] = useState('2')
    
    return (
        <div>
            <NextSeo 
                    title="Instrument Library" 
                    description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
                />
                <h1 className={styles.headingOne}>The Instrument Library</h1>
                <h5 className={styles.headingFive}>Browse all instruments included in Instrumentation Generation</h5>
                <select onChange={(e) => setSortingOption([...e.target.value])} style={{float: 'right', marginRight:'2rem'}}>
                    <option selected value ="0">Random</option> 
                    <option value="1">A - Z</option>
                    <option value="2">Z - A</option>
                </select>
                <br/>
            <LibraryInstrumentList sortOption={sortingOption} />
        </div>
    )
}

export default library
