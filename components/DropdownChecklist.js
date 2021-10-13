import { Form } from 'react-bootstrap'
import styles from '../styles/DropdownChecklist.module.scss'
import {useState, useEffect } from 'react'


const DropdownChecklist = ({checkOptions, returnChecksState}) => {
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
        <Form className={styles.checkMenu}>
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
        </Form>

        
    )
}

export default DropdownChecklist