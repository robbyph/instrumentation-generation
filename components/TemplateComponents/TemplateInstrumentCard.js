import {Card, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap'

const TemplateInstrumentCard = ({name, imagePath}) => {
    

    return (
            <Card style={{minWidth: '11rem', flexGrow: 1, minHeight: '16rem'}}>
                <Card.Img variant="top" src={imagePath} style={{padding:'1rem', minHeight: '10rem', maxHeight: '10rem', height:'100%', objectFit: 'contain'}} />
                <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
    )
}

export default TemplateInstrumentCard
