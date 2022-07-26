import { NavDropdown, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Navigation.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import SubscriptionModal from "./SubscriptionModal";

const Navigation = ({ currentPage }) => {
  const [show, setShow] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const showModal = (e) => {
    setShowSubscriptionModal(true);
  };
  const hideModal = (e) => {
    setShowSubscriptionModal(false);
  };

  return (
    <nav>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid">
            <Link href="/" passHref>
              {currentPage === "/" ? (
                <Nav.Link className="active">
                  <strong>Home</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>Home</strong>
                </Nav.Link>
              )}
            </Link>
            <Link href="/instructions" passHref>
              {currentPage === "/instructions" ? (
                <Nav.Link className="active">
                  <strong>About</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>About</strong>
                </Nav.Link>
              )}
            </Link>
            <Link href="/library" passHref>
              {currentPage === "/library" ? (
                <Nav.Link className="active">
                  <strong>Instrument Library</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>Instrument Library</strong>
                </Nav.Link>
              )}
            </Link>
            <Link href="/donate" passHref>
              {currentPage === "/donate" ? (
                <Nav.Link className="active">
                  <strong>Support Me</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>Support Me</strong>
                </Nav.Link>
              )}
            </Link>
            <Link href="/changelog" passHref>
              {currentPage === "/changelog" ? (
                <Nav.Link className="active">
                  <strong>Changelog</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>Changelog</strong>
                </Nav.Link>
              )}
            </Link>
            <Link href="/feedback" passHref>
              {currentPage === "/feedback" ? (
                <Nav.Link>
                  <strong>Feedback</strong>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <strong>Feedback</strong>
                </Nav.Link>
              )}
            </Link>
            <div
              href="true"
              onClick={(e) => {
                e.preventDefault();
              }}
              className={styles.naviDropdown}
              id="navigationDropdown"
              style={{ margin: "0" }}
            >
              <NavDropdown
                title={<strong>Compositional Toolkit</strong>}
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Button
                  className={styles.btnOverride}
                  variant="dark"
                  style={{ color: "white" }}
                  onClick={showModal}
                >
                  More Tools Coming Soon!
                  <br />
                  Click here to join the mailing list!
                </Button>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {showSubscriptionModal ? <SubscriptionModal onClose={hideModal} /> : ""}
    </nav>
  );
};

export default Navigation;
