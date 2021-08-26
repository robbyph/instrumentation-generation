import LibraryInstrumentCard from './LibraryInstrumentCard'
import styles from '../../styles/InstrumentList.module.scss'
import {CardDeck} from 'react-bootstrap'
import instrumentData from '../data/instruments.json'

const LibraryInstrumentList = () => {
    
    var instruments = [];
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

      var newInstruments = [...instrumentData]
      instruments = shuffle(newInstruments)

    return (
            <CardDeck key={1} className={styles.container} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {instruments.map((instrument, i) => (
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
                )) }
            </CardDeck>
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