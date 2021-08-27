import {Alert, Button, ButtonGroup, ButtonToolbar, Collapse} from 'react-bootstrap'
import PropTypes  from 'prop-types'
import {useState} from 'react'


const Alerts = ({alerts, onClosing}) => {
    var myAlerts = alerts


    return(
        <>
        {myAlerts.map((alert, i) =>(
        <Alert key={alert.key} variant={alert.alertVariant} onClose={() => onClosing(alert.key)}  dismissible style={{margin:'1rem', top: '30px'}} className={"sticky-top"}>
            <Alert.Heading><span style={{display:"inline", backgroundColor: "white", paddingLeft:'.25rem', paddingRight:'.25rem', borderRadius:'.5rem'}}>{i + 1}</span> {alert.alertHeading} </Alert.Heading>
            <p>{alert.alertText}</p>  
            {alert.buttonless ? '' : 
            <ButtonToolbar>
                <ButtonGroup style={{margin:'.5rem .5rem .5rem 0'}}>
                    <Button variant={alert.alertVariant} onClick={() => { alert.methodToExecute != undefined  ? (alert.methodToExecute(), onClosing(alert.key)): onClosing(alert.key); }}> {alert.buttonText != undefined ? alert.buttonText : 'OK'}</Button>                
                </ButtonGroup>
                <ButtonGroup style={{margin:'.5rem'}}>
                    <Button variant={alert.alertVariant} onClick={() => onClosing(alert.key)}>Close</Button>
                </ButtonGroup>
            </ButtonToolbar>}
        </Alert>
        ))}
        </>
        

    )
}

/* Alerts.propTypes = {
    onClosing: PropTypes.func
} */

export default Alerts
