import {Modal, Container, Row, Col} from 'react-bootstrap'
import NewsletterSubscribe from './NewsletterSubscribe'

const SubscriptionModal = (onClose) => {  


    return (
        <Container>
        <Modal show={true} onHide={onClose.onClose}>
            <Modal.Header closeButton>
                <Row style={{width: '98%'}}>
                    <Col xl={2}><Modal.Title>Subscribe</Modal.Title></Col>
                </Row>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col><NewsletterSubscribe></NewsletterSubscribe></Col>
                </Row>
            </Modal.Body>
        </Modal>
        </Container>
    )
}

export default SubscriptionModal