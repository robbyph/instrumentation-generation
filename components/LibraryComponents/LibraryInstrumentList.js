import LibraryInstrumentCard from './LibraryInstrumentCard'
import styles from '../../styles/InstrumentList.module.scss'
import {Row, Col} from 'react-bootstrap'
import instrumentData from '../data/instruments.json'
import { useEffect, useState } from 'react'

const LibraryInstrumentList = (sortOption) => {
    //var instruments = [];
    const [instruments, setInstruments] = useState([])
    var sorting = sortOption.sortOption;

    console.log(sorting)

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      useEffect(() => {
        var newInstruments = [...instrumentData]
        if (sorting === '0') {
            setInstruments(shuffle(newInstruments))
        }else if (sorting === '1') {
            setInstruments(newInstruments.sort((a, b) => a.name.localeCompare(b.name)))
        }else if (sorting === '2') {
            setInstruments(newInstruments.sort((a, b) => a.name.localeCompare(b.name)).reverse())
        }else{
            setInstruments(shuffle(newInstruments))
        }
        
      }, [sorting]);

    return (
        <Row key={1} className={styles.container} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {instruments.map((instrument, i) => (
            <Col key={i} className={styles.properCol}>
                <LibraryInstrumentCard
                        key={i} 
                        id={i}
                        instr = {instrument}
                        name={instrument.name} 
                        description={instrument.description}
                        imagePath={instrument.image}
                        wikiLink={instrument.wikipedia}
                        tubeLink={instrument.youtube}
                        style={{flex: 1}}>
                    </LibraryInstrumentCard>
            </Col>
        )) }
       
    </Row>
    )
}

export default LibraryInstrumentList


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