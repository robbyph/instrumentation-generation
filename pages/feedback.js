import { NextSeo } from "next-seo";
import styles from "../styles/Feedback.module.scss";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const feedback = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponseText("Sending...");

    let data = {
      name,
      email,
      subject,
      message,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        setResponseText("Sent!");
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    });
  };

  return (
    <div>
      <NextSeo
        title="Feedback"
        description="A tool for composers to generate random groups of instruments to help jumpstart creativity."
      />
      <h1 className={styles.headingOne}>Feedback</h1>
      <div className={styles.container}>
        <p className={styles.p}>
          Found a broken link? Have you found inaccurate info in one of the
          instrument descriptions? Do you think that one of the instruments is
          tagged incorrectly? Technical glitch? Need help fixing a corrupted
          instrument list? Send me an email and I'll look into it! Or, if you'd
          rather, open a pull request on the github page!
          <br />
        </p>
        <p className={styles.p}>
          Also! If you know an instrument that you think should be added, please
          let me know!
        </p>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="textarea"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="textarea"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Comments, Questions and/or Concerns</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Form.Group>
          <Row>
            <Col xl={1}>
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Send
              </Button>
            </Col>
            <Col xl={1}>
              <hr
                style={{
                  height: "0px",
                  visibility: "hidden",
                  margin: ".15rem",
                }}
              />
              <p style={{ margin: 0 }}>{responseText}</p>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default feedback;
