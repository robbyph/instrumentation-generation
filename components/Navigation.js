import {NavDropdown, Navbar, Nav, Button} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Navigation.module.scss'
import Link from 'next/link'
import {useState} from 'react'
import SubscriptionModal from './SubscriptionModal'




const Navigation = ({currentPage}) => {
    const [show, setShow] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    const showModal = (e)=>{
        setShowSubscriptionModal(true);
    }
    const hideModal = e => {
        setShowSubscriptionModal(false);
    }

    return (
        <div >
            <Navbar collapseOnSelect expand="md" bg='dark' variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="container-fluid">
                    <Link href="/" passHref>
                        {currentPage === '/' ? <Nav.Link className="active">Home</Nav.Link> : <Nav.Link>Home</Nav.Link>}
                    </Link>
                    <Link href="/instructions" passHref>
                        {currentPage === '/instructions' ? <Nav.Link className="active">About</Nav.Link> : <Nav.Link>About</Nav.Link>}
                    </Link>
                    <Link href="/library" passHref>
                        {currentPage === '/library' ? <Nav.Link className="active">Instrument Library</Nav.Link> : <Nav.Link>Instrument Library</Nav.Link>}
                    </Link>
                    <Link href="/donate" passHref>
                        {currentPage === '/donate' ? <Nav.Link className="active">Support</Nav.Link> : <Nav.Link>Support</Nav.Link>}
                    </Link>
                    <Link href="/changelog" passHref>
                        {currentPage === '/changelog' ? <Nav.Link className="active">Changelog</Nav.Link> : <Nav.Link>Changelog</Nav.Link>}
                    </Link>
                    <Link href="/feedback" passHref>
                        {currentPage === '/feedback' ? <Nav.Link className="active">Feedback</Nav.Link> : <Nav.Link>Feedback</Nav.Link>}
                    </Link>
                    <div className={styles.naviDropdown}
                        id="navigationDropdown" style={{margin: '0'}}>
                    <NavDropdown 
                        title="Compositional Toolkit"
                        show={show}
                        onMouseEnter={showDropdown} 
                        onMouseLeave={hideDropdown}>
                            <Button className={styles.btnOverride} variant="dark" style={{color: 'white'}} onClick={showModal}>More Tools Coming Soon!<br/>Click here to join the mailing list!</Button> 
                    </NavDropdown> 
                    </div>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            {showSubscriptionModal ? <SubscriptionModal onClose={hideModal}/> :  ''}
        </div>
    )
}

export default Navigation