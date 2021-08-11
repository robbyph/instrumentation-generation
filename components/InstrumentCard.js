import {Card, Button, ButtonGroup, Col} from 'react-bootstrap'
import styles from '../styles/InstrumentCard.module.scss'
import {useState} from 'react'

const InstrumentCard = ({id, name, description, imagePath, wikiLink, tubeLink, onDelete, isLocked, onLock, onShuffle, setReplacementInstrumentID, onRepButtonClick}) => {
    
    return (
            
            <Card style={{minWidth: '16rem', flexGrow: 1, margin:'1rem', minHeight:'32rem'}}>
                <div>
                    <button id="lockButton" onClick={() => {onLock(id)}} className={isLocked ? styles.btnOverrideLocked : styles.btnOverride}>{isLocked ? "🔒" : "🔓"}</button>
                    <button id="shuffleButton" autoFocus={true} onClick={()=> {onShuffle(id)}} className={styles.btnOverrideShuffle} style={{float: "right"}}><span>🔀</span></button>
                </div>
                <div>
                <Card.Img variant="top" src={imagePath} style={{padding:'1rem', minHeight: '10rem', maxHeight: '10rem', height:'100%', objectFit: 'contain'}} />
                </div>
                <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    </div>
                    <div style={{marginTop: '.5rem'}}>
                    <ButtonGroup style={{width: "100%"}}>
                        <Button variant="danger" onClick={()=> onDelete(id)}>Delete</Button>
                        <Button variant="secondary" onClick={()=> {setReplacementInstrumentID(id); onRepButtonClick()}} >Replace</Button>
                    </ButtonGroup>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Card.Link target="_blank" rel="noopener noreferrer" href={wikiLink}>Wikipedia</Card.Link>
                    <Card.Link target="_blank" rel="noopener noreferrer" href={tubeLink}>Youtube</Card.Link>
                </Card.Footer>
            </Card>
    )
}

export default InstrumentCard
