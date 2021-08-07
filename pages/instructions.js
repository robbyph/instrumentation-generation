import { NextSeo } from 'next-seo'
import styles from '../styles/Instructions.module.scss'

const instructions = () => {
    return (
        <>
            <NextSeo 
                title="About" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <h1 className={styles.headingOne}>What is Instrumentation Generation?</h1>
            <div className={styles.container}></div>
            <h1 className={styles.headingOne}>Where am i supposed to get all these instruments?</h1>
            <div className={styles.container}></div>
        </>
    )
}

export default instructions
