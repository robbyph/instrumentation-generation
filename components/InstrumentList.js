import InstrumentCard from './InstrumentCard'
import styles from '../styles/InstrumentList.module.scss'
import {CardDeck} from 'react-bootstrap'


const InstrumentList = ({instruments, onDel, onLoc, onShuf, onRep, onRepButClick, setRepInstrumentID}) => {
    
    return (
            <CardDeck key={1} className={styles.container} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {instruments.map((instrument, i) => (
                    <InstrumentCard
                        key={i} 
                        id={i}
                        instr = {instrument}
                        name={instrument.name} 
                        description={instrument.description}
                        imagePath={instrument.image}
                        wikiLink={instrument.wikipedia}
                        tubeLink={instrument.youtube}
                        onDelete = {onDel}
                        isLocked = {instrument.locked}
                        onLock = {onLoc}
                        onShuffle = {onShuf}
                        onReplace = {onRep}
                        onRepButtonClick = {onRepButClick}
                        setReplacementInstrumentID = {setRepInstrumentID}
                        style={{flex: 1}}>
                            
                    </InstrumentCard>
                )) }
            </CardDeck>
    )
}

export default InstrumentList


{/* <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard>
                <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard>
                <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard>
                <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard>
                <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard>
                <InstrumentCard 
                    name="Trumpet" 
                    description="A high pitched brass instrument" 
                    imagePath='images/instruments/trumpet.png'
                    wikiLink='https://en.wikipedia.org/wiki/Trumpet'
                    tubeLink='https://www.youtube.com/watch?v=QcIp7K2UFgE'>
                </InstrumentCard> */}