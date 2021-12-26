import { Form, Button } from 'react-bootstrap'
import styles from '../styles/DropdownChecklist.module.scss'
import {useState, useEffect } from 'react'


const DropdownChecklist = ({disabled, checkOptions, returnChecksState}) => {
    const [checks, setChecks] = useState([...checkOptions]); 

    function setCheck(id){
        var newArray = [...checks]
        var newElement = checks[id];
        newElement.checked = (!newElement.checked)
        newArray[id] = newElement;
        setChecks(newArray);
        returnChecksState(checks);
    }
    
    return (
        <Form  className={styles.checkMenu}>
            <fieldset disabled={disabled}>
            {checks.map((checkItem, i) => (
                 <Form.Check
                    key={i}
                    id={i}
                    type='checkbox'
                    label={checkItem.label}
                    defaultChecked={checkItem.checked}
                    onClick={() => {setCheck(i)}}
                ></Form.Check>
            )) }
            </fieldset>
        </Form>

        

        
    )
}

export default DropdownChecklist
