import { NextSeo } from 'next-seo'
import styles from '../styles/Feedback.module.scss'
import { Form, Button } from 'react-bootstrap'

const feedback = () => {
    return (
        <div>
            <NextSeo 
                title="Feedback" 
                description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
            />
            <h1 className={styles.headingOne}>Feedback</h1>
            <div className={styles.container}>
                <p className={styles.p}>
                    Found a broken link? Have you found inaccurate info in one of the instrument descriptions? Do you think that one of the instruments is tagged incorrectly? Technical glitch? Send me an email and I'll look into it! Or, if you'd rather, open a pull request on the github page!
                    <br />
                </p>
                <p className={styles.p}>Also! If you see an instrument that you think should be added, please let me know and i will add it to the list!"</p>
                <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button>Send</Button>
            </Form>
            </div>
            
        </div>
    )
}

export default feedback
