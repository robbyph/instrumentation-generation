import styles from '../styles/Library.module.scss'
import LibraryInstrumentList from '../components/LibraryComponents/LibraryInstrumentList'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import {Form, Container, Col, Row, Collapse, Button} from 'react-bootstrap'


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
                                                <Form.Control as="select" multiple style={{borderRadius: '.5rem'}}>
                                                    <option selected value='contemporary'>Contemporary</option>
                                                    <option selected value='orchestral'>Orchestral</option>
                                                    <option selected value='traditional'>Traditional</option>
                                                    <option selected value='vocal'>Vocal</option>
                                                </Form.Control>
                                            </Col>
                                            <Col>
                                            <h5 style={{textAlign: 'center', color: 'white'}}>Family Filtering: </h5>
                                                <Form.Control as="select" multiple style={{borderRadius: '.5rem'}}>
                                                    <option selected value='string'>String</option>
                                                    <option selected value='percussion'>Percussion</option>
                                                    <option selected value='brass'>Brass</option>
                                                    <option selected value='wind'>Wind</option>
                                                    <option selected value='electronic' >Electronic</option>
                                                    <option selected value='keyboard'>Keyboard</option>
                                                </Form.Control>
                                            </Col>
                                            </Row>
                                        </Collapse>
                                    </Col>
                                    <Col xl={{span: 2, offset: 2}}>
                                        <div style={{marginRight: '2rem'}}>
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
                    <br/>
            </Container>

            <LibraryInstrumentList sortOption={sortingOption} />
        </div>
    )
}

export default library
