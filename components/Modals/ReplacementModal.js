import {Modal, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'

const ReplacementModal = ({onClose, instruments, onConfirm, ogInstId}) => {
    const originalInstrumentID = {ogInstId};  
    const [selectedInstrument, setSelectedInstrument] = useState(instruments[0])   
    const [sortingOption, setSortingOption] = useState({})
    const [myInstruments, setMyInstruments] = useState([...instruments]) 
    

    const findInstrumentByName = (name) => {
        var newInstrument

        instruments.map((instrument) => {
            if (instrument.name === name) {
                newInstrument = instrument
            }
        })

        setSelectedInstrument(newInstrument)
    }

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
      var newInstruments = [...instruments]
      if (sortingOption === '0') {
          setMyInstruments(shuffle(newInstruments))
          setSelectedInstrument(newInstruments[0])
      }else if (sortingOption === '1') {
          setMyInstruments(newInstruments.sort((a, b) => a.name.localeCompare(b.name)))
          setSelectedInstrument(newInstruments[0])
      }else if (sortingOption === '2') {
          setMyInstruments(newInstruments.sort((a, b) => a.name.localeCompare(b.name)).reverse())
          setSelectedInstrument(newInstruments[0])
      }else{
          setMyInstruments(shuffle(newInstruments))
          setSelectedInstrument(newInstruments[0])
      }
      console.log(sortingOption)
      console.log(myInstruments)
      
    }, [sortingOption]);

    //replaacement instruments will always start out locked
    selectedInstrument.locked = false;


    return (
        <Modal show={true} onHide={onClose} backdrop="static" keyboard={false} animation="false">
        <Modal.Header closeButton>
          <Modal.Title>Instrument Picker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <select className="custom-select" style={{width: '35%', float:'right'}} onChange={(e) => setSortingOption(e.target.value)}>
                    <option defaultValue value ="0">Random</option> 
                    <option value="1">A - Z</option>
                    <option value="2">Z - A</option>
                </select>
                <br/><br/>
          <Form.Control value={selectedInstrument.name} onChange={(e) => findInstrumentByName(e.target.value)} as="select">
            {myInstruments.map((instrument, i) => {
                return <option key={i}>{instrument.name}</option>
            })
            } 
          </Form.Control>
          <img className={"d-block w-100"} src={'../' + selectedInstrument.image} alt={selectedInstrument.name} style={{padding:'1rem', maxHeight: '10rem', height:'100%', objectFit: 'contain', marginTop: '1rem'}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {onConfirm(originalInstrumentID, selectedInstrument); onClose()}}>Select</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default ReplacementModal
