import TemplateInstrumentCard from './TemplateInstrumentCard'
import styles from '../../styles/TemplateInstrumentList.module.scss'
import {Row, Col} from 'react-bootstrap'


const TemplateInstrumentList = ({instruments, cardSize}) => {
    
    
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



      
      //On render
      instruments = shuffle(instruments)
      



    return (
            <Row key={1} className={styles.container} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>

                {instruments.map((instrument, i) => (
                    <Col key={i} className={styles.properCol}>
                    <TemplateInstrumentCard
                        key={i} 
                        id={i}
                        instr = {instrument}
                        name={instrument.name} 
                        description={instrument.description}
                        imagePath={instrument.image}
                        wikiLink={instrument.wikipedia}
                        tubeLink={instrument.youtube}
                        cardSize={cardSize}
                        style={{flex: 1}}>
                    </TemplateInstrumentCard>
                    </Col>
                )) }
            </Row>
    )
}

export default TemplateInstrumentList