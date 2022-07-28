import {
  Modal,
  Button,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import TemplateInstrumentList from "../TemplateComponents/TemplateInstrumentList";
import styles from "../../styles/TemplateModal.module.scss";
import { CollectionPageJsonLd } from "next-seo";

const TemplateModal = ({ onClose, templates, onConfirm, allInstruments }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const onRandomTemplate = () => {
    setSelectedTemplate(
      templates[Math.floor(Math.random() * templates.length)]
    );
  };

  const findTemplateByName = (incomingTemplate) => {
    var newTemplate;

    templates.map((template, i) => {
      if (template.name === incomingTemplate.name) {
        newTemplate = template;
      }
    });

    var newInstrumentList = [];

    newTemplate.instruments.map((templateI) => {
      allInstruments.map((masterI) => {
        if (templateI === masterI.name) {
          newInstrumentList.push(masterI);
        }
      });
    });

    return newInstrumentList;
  };

  return (
    <Container fluid>
      <Modal
        className={styles.templateModal}
        size="xl"
        show={true}
        onHide={onClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Row style={{ width: "98%" }}>
            <Col xl={2}>
              <Modal.Title>Templates</Modal.Title>
            </Col>
            <Col
              style={{ paddingTop: ".5rem" }}
              xl={{ span: 1, offset: 9 }}
              onClick={onRandomTemplate}
            >
              <Button>Random</Button>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Row>
            <Col lg={2} md={3} className={styles.column}>
              <Navbar expand="xl" style={{ width: "100%", padding: 0 }}>
                <Nav
                  className="flex-column"
                  vertical="true"
                  style={{ width: "100%" }}
                >
                  {templates.map((template, i) => {
                    if (template.name === selectedTemplate.name) {
                      return (
                        <Button
                          className="active"
                          style={{
                            padding: ".75rem",
                            width: "100%",
                            borderRadius: 0,
                          }}
                          key={i}
                          onClick={() => {
                            setSelectedTemplate(template);
                          }}
                        >
                          {template.name}
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          style={{
                            padding: ".75rem",
                            width: "100%",
                            borderRadius: 0,
                          }}
                          key={i}
                          onClick={() => {
                            setSelectedTemplate(template);
                          }}
                        >
                          {template.name}
                        </Button>
                      );
                    }
                  })}
                </Nav>
              </Navbar>
            </Col>
            <Col
              id={styles.instrumentPanel}
              style={{ marginTop: "1rem", height: "45rem", overflowY: "auto" }}
            >
              <h3 align="center">{selectedTemplate.name}</h3>
              <h6 align="center">{selectedTemplate.description}</h6>
              <TemplateInstrumentList
                instruments={findTemplateByName(selectedTemplate)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm(findTemplateByName(selectedTemplate));
              onClose();
            }}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TemplateModal;
