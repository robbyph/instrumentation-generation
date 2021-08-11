import { Button, Row, Col, Container, Form } from "react-bootstrap"
import styles from "../styles/ParameterList.module.scss"
import {useState} from 'react'

const ParameterList = ({onRandomList, onNewList, onClear, onDupesCheck, onInstrumentModal, onTemplateModal, pushAlert}) => {
    
    const [newListState, setNewListState] = useState('')
    const [minNumberState, setMinNumberState] = useState('')
    const [maxNumberState, setMaxNumberState] = useState('')
    
  

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
                            <Form.Label>Other Parameters</Form.Label>
                            <Form.Check onChange={onDupesCheck} className={styles.formCheckOverride} label="No Duplicates?" id="noDupes"/>
                            <Button type="button" variant="warning" onClick={onClear}>Clear List</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default ParameterList
