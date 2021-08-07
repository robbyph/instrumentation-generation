import {Modal, Button, Form} from 'react-bootstrap'
import {useState} from 'react'

const InstrumentModal = ({onClose, instruments, onConfirm}) => {
    const [selectedInstrument, setSelectedInstrument] = useState(instruments[0])    
    

    const findInstrumentByName = (name) => {
        var newInstrument

        instruments.map((instrument) => {
            if (instrument.name === name) {
                newInstrument = instrument
            }
        })

        setSelectedInstrument(newInstrument)
    }

    //chosen instruments will always start out locked
    selectedInstrument.locked = false;

    return (
        <Modal show={true} onHide={onClose} backdrop="static" keyboard={false} animation="false">
        <Modal.Header closeButton>
          <Modal.Title>Instrument Picker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control value={selectedInstrument.name} onChange={(e) => findInstrumentByName(e.target.value)} as="select">
            {instruments.map((instrument, i) => {
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
          <Button variant="primary" onClick={() => {onConfirm(selectedInstrument); onClose()}}>Select</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default InstrumentModal
