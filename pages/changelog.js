import { NextSeo } from 'next-seo'
import styles from '../styles/Changelog.module.scss'


const changelog = () => {
    return (
        <div>
            <NextSeo 
                title="Changelog" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <h1 className={styles.headingOne} style={{marginBottom: '1rem'}}>Changelog</h1>
                <div id={styles.changeList} className={styles.container} style={{paddingTop: '.5rem'}}>
                    <div className={styles.changeItem} style={{paddingTop: 0}}>
                        <h4 className={styles.headingFour}>Version 0.5</h4>
                        <p className={styles.itemDate}>August 6th 2021</p>
                        <ul className={styles.changes}>
                            <li className={styles.listItem}>Initial Application Version</li>
                        </ul>
                    </div>
                </div>

        </div>
    )
}

export default changelog
