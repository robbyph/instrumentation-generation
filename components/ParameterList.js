import { Button, Row, Col, Container, Form } from "react-bootstrap"
import styles from "../styles/ParameterList.module.scss"
import {useState} from 'react'

const ParameterList = ({onRandomList, onNewList, onClear, onDupesCheck, onInstrumentModal, onTemplateModal, onTagGen, onExport, onImport        }) => {
    
    const [newListState, setNewListState] = useState('')
    const [minNumberState, setMinNumberState] = useState('')
    const [maxNumberState, setMaxNumberState] = useState('')
    const [categoryState, setCategoryState] = useState('contemporary')
    const [familyState, setFamilyState] = useState('string')
    const [tagGenNum, setTagGenNum] = useState('1')

    return (
        <div className={styles.container} id="paramsDiv">
            <Container fluid >
                <Row>
                    <Col align="center" xl={{ span: 6, offset: 3}} style={{marginBottom: '1rem'}}>
                        <Form className={styles.formOverride}>
                            <Form.Label>Start with a Template</Form.Label>
                            <Button style={{marginTop: '.5rem'}} onClick={() => {onTemplateModal()}}>Templates</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col align="center" style={{marginTop:'.5rem', marginBottom: '1rem'}}>
                        <Form.Label style={{fontSize: '1.5rem'}}>Or</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col align="center" style={{marginBottom: '1rem', minWidth: '18rem'}}>
                        <Form className={styles.formOverride}>
                            <Form.Label>Generate a new list of instruments</Form.Label>
                            <Form.Control onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className={styles.formControlOverride} type="number" placeholder="Minimum" min="0" value={minNumberState} onChange={(e) => setMinNumberState(e.target.value)}/>
                            <Form.Control onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className={styles.formControlOverride} type="number" placeholder="Maximum" min="0" value={maxNumberState} onChange={(e) => setMaxNumberState(e.target.value)}/>
                            <Button style={{marginTop: '.5rem'}} type="button" onClick={() => {onRandomList(minNumberState, maxNumberState); setMaxNumberState(''); setMinNumberState('')}}>Generate Random List</Button>
                        </Form>
                    </Col>
                    <Col align="center" style={{marginBottom: '1rem' , minWidth: '18rem'}}>
                        <Form className={styles.formOverride}>
                            <Form.Label>Add a random group of new instruments</Form.Label>
                            <Form.Control onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className={styles.formControlOverride} type="number" placeholder="Amount of Instruments" min="0" value={newListState} onChange={(e) => setNewListState(e.target.value)}/>
                            <Button type="button" onClick={() => {onNewList(newListState); setNewListState('')}}>Generate Random Instrument(s)</Button>
                        </Form>
                    </Col>
                    <Col align="center" style={{marginBottom: '1rem', minWidth: '18rem'}}>
                        <Form className={styles.formOverride}>
                            <Form.Label>Choose an instrument to add to the list</Form.Label>
                            <Button onClick={() => {onInstrumentModal()}}>Select Instrument</Button>
                        </Form>
                    </Col>
                    <Col align="center" style={{marginBottom: '1rem', minWidth: '18rem'}}>
                        <Form className={styles.formOverride}>
                            <Row><Col><Form.Label>Generate a random instrument by category and family</Form.Label></Col></Row>
                            <Row>
                                <Col xl={3}>
                                    <Form.Control onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className={styles.formControlOverride} type="number" placeholder="#" min="1" value={tagGenNum} onChange={(e) => setTagGenNum(e.target.value)}></Form.Control>
                                </Col>
                                <Col xl={5}>
                                    <Form.Control className={styles.formControlOverride} placeholder="Category" as="select" value={categoryState} onChange={(e) => setCategoryState(e.target.value)}>
                                        <option value='contemporary'>Contemporary</option>
                                        <option value='orchestral'>Orchestral</option>
                                        <option value='traditional'>Traditional</option>
                                        <option value='vocal'>Vocal</option>
                                    </Form.Control>
                                </Col>
                                <Col xl={4}>
                                    <Form.Control disabled={categoryState != 'vocal' ? false : true} className={styles.formControlOverride} placeholder="Family" as="select" value={familyState} onChange={(e) => setFamilyState(e.target.value)}>
                                        <option value='string'>String</option>
                                        <option value='percussion'>Percussion</option>
                                        <option value='brass' disabled={categoryState != 'contemporary' && categoryState != 'traditional' ? false : true}>Brass</option>
                                        <option value='wind'>Wind</option>
                                        <option value='electronic' disabled={categoryState != 'traditional' && categoryState != 'orchestral' ? false : true}>Electronic</option>
                                        <option value='keyboard' disabled={categoryState != 'orchestral' ? false : true}>Keyboard</option>
                                    </Form.Control>
                            </Col></Row>
                            <Row><Col><Button onClick={() => {onTagGen(tagGenNum, categoryState, familyState)}}>Generate {tagGenNum} {categoryState} {categoryState != 'vocal' ? familyState : ''} instrument{tagGenNum != 1 ? 's' : ''}</Button></Col></Row>
                        </Form>
                    </Col>
                    <Col align="center" style={{marginBottom: '1rem', minWidth: '18rem'}}>
                        <Form className={styles.formOverride}>
                            <Form.Label>Other Parameters</Form.Label>
                            <Form.Check onChange={onDupesCheck} className={styles.formCheckOverride} label="No Duplicates?" id="noDupes"/>
                            <Row>
                                <Col xl={4}><Button style={{height: '100%'}} type="button" variant="warning" onClick={onClear}>Clear List</Button></Col>
                                <Col xl={4}><Button style={{height: '100%'}} type="button" variant="secondary" onClick={onExport}>Export list</Button></Col>
                                <Col xl={4}><Button style={{height: '100%'}} type="button" variant="secondary" onClick={onImport}>Import list</Button></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default ParameterList
