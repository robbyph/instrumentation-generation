import {Card, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap'


const LibraryInstrumentCard = ({id, name, description, imagePath, wikiLink, tubeLink}) => {
    

    return (
            <Card style={{minWidth: '16rem', flexGrow: 1, margin:'1rem', minHeight: '25rem', maxHeight:'25rem'}}>
                <Card.Img variant="top" src={imagePath} style={{padding:'1rem', maxHeight: '10rem', height:'100%', objectFit: 'contain'}} />
                <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
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
