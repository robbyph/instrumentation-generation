import {NavDropdown, Navbar, Nav, Button} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Navigation.module.scss'
import Link from 'next/link'
import {useState} from 'react'


const Navigation = ({currentPage}) => {
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
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
                    <NavDropdown 
                        className='ml-auto'
                        title="Compositional Toolkit"
                        show={show}
                        onMouseEnter={showDropdown} 
                        onMouseLeave={hideDropdown}>
                            <Button className={styles.btnOverride} variant="dark" style={{color: 'white'}}>More Tools Coming Soon!<br/>Click here to join the mailing list!</Button> 
                    </NavDropdown> 
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default Navigation