import {Card, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap'
import styles from '../../styles/InstrumentCard.module.scss'


const LibraryInstrumentCard = ({id, name, description, imagePath, wikiLink, tubeLink}) => {
    

    return (
            <Card style={{minWidth: '16rem', flexGrow: 1, margin:'1rem', minHeight: '27rem', maxHeight:'27rem'}}>
                <Card.Img variant="top" src={imagePath} style={{paddingTop:'1rem', paddingLeft:'1rem', paddingRight:'1rem', paddingBottom:'0', minHeight: '10rem', maxHeight: '10rem', height:'100%', objectFit: 'contain'}} />
                <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '.5rem'}}>
                    <div>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Card.Link target="_blank" rel="noopener noreferrer" href={wikiLink}>Wikipedia</Card.Link>
                    <Card.Link target="_blank" rel="noopener noreferrer" href={tubeLink}>Youtube</Card.Link>
                </Card.Footer>
            </Card>
    )
}

export default LibraryInstrumentCard
