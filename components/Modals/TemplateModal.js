import {Modal, Button, Form, ButtonGroup, Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import TemplateInstrumentList from '../TemplateComponents/TemplateInstrumentList'

const TemplateModal = ({onClose, templates, onConfirm}) => {
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0])    
    
    const findTemplateByName = (name) => {
        var newTemplate

        templates.map((template, i) => {
            
            if (template.name === name) {
                newTemplate = template
            }
        })
        setSelectedTemplate(newTemplate)
    }

    //template instruments will always start out locked
    selectedTemplate.instruments.map((instrument) =>{
        instrument.locked = false
    })


    return (
        <Modal size='xl' show={true} onHide={onClose} keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title>Templates</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{paddingTop: 0, paddingBottom: 0}}>
                <Row>
                    <Col className='col-2' style={{height: '48rem', overflowY: 'auto', padding:0}}>
                        <ButtonGroup vertical style={{width: '100%'}}>
                            {templates.map((template, i) => {
                                if(template === selectedTemplate){
                                    return <Button className='active' style={{padding: '.75rem'}} key={i} onClick={() => {findTemplateByName(template.name)}}>{template.name}</Button>
                                }else{
                                    return <Button style={{padding: '.75rem'}} key={i} onClick={() => {findTemplateByName(template.name)}}>{template.name}</Button>
                                }
                            })
                            } 
                        </ButtonGroup> 
                    </Col>
                    <Col style={{marginTop: '1rem', height: '45rem', overflowY: 'auto'}}>
                        <h3 align='center'>{selectedTemplate.name}</h3>
                        <h6 align='center'>{selectedTemplate.description}</h6>
                        <TemplateInstrumentList instruments={selectedTemplate.instruments} cardSize='small'/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {onConfirm(selectedTemplate); onClose()}}>Select</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TemplateModal
