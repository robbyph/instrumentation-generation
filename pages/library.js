import styles from '../styles/Library.module.scss'
import LibraryInstrumentList from '../components/LibraryComponents/LibraryInstrumentList'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import {Form, Container, Col, Row, Collapse, Button} from 'react-bootstrap'
import DropdownChecklist from '../components/DropdownChecklist'


const library = () => {
    const [sortingOption, setSortingOption] = useState('0')
    const [open, setOpen] = useState(false);

    return (
        <div>
                <NextSeo 
                    title="Instrument Library" 
                    description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
                />

                <Container fluid>

                    <Row>
                        <Col>
                            <h1 className={styles.headingOne}>The Instrument Library</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h5 className={styles.headingFive}>Browse all instruments included in Instrumentation Generation</h5>
                        </Col>
                    </Row>

                    <Row style={{marginTop: '1rem'}}>
                        <Col>
                            <Form>
                                <Row>
                                    <Col xl={{span: 4, offset: 4}}>
                                        <Button variant="outline-light" style={{width: '100%'}} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}><span style={{float:'left'}}>{open ? '▲' : '▼' }</span>Filtering</Button>
                                        <Collapse in={open}>
                                            <Row style={{marginTop: '1rem'}}>
                                            <Col>
                                                <h5 style={{textAlign: 'center', color: 'white'}}>Category Filtering: </h5>
                                                <DropdownChecklist checkOptions={[{label: 'Contemporary', checked: true}, {label: 'Orchestral', checked: true}, {label: 'Traditional', checked: true}, {label: 'Vocal', checked: true}]}></DropdownChecklist>
                                            </Col>
                                            <Col>
                                                <h5 style={{textAlign: 'center', color: 'white'}}>Family Filtering: </h5>
                                                <DropdownChecklist checkOptions={[{label: 'String', checked: true}, {label: 'Percussion', checked: true}, {label: 'Brass', checked: true}, {label: 'Wind', checked: true}, {label: 'Electronic', checked: true}, {label: 'Keyboard', checked: true}]}></DropdownChecklist>
                                            </Col>
                                            </Row>
                                        </Collapse>
                                    </Col>
                                    <Col xl={{span: 2, offset: 2}}>
                                        <div className={styles.sortButton}>
                                            <select className="custom-select" id='sortingSelect' onChange={(e) => setSortingOption(e.target.value)}>
                                            <option defaultValue value ="0">Random</option> 
                                            <option value="1">A - Z</option>
                                            <option value="2">Z - A</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
    
            </Container>

            <LibraryInstrumentList sortOption={sortingOption} />
        </div>
    )
}

export default library
