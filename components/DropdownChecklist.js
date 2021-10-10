import { Form } from 'react-bootstrap'
import styles from '../styles/DropdownChecklist.module.scss'
import {useState, useEffect } from 'react'


const DropdownChecklist = (checkOptions, returnChecksState) => {
    const [checks, setChecks] = useState([...checkOptions.checkOptions]);

    console.log(checks)

    function setCheck(id){

    }
    
    return (
        <Form className={styles.checkMenu}>
            {checks.map((checkItem, i) => (
                 <Form.Check
                 id={i}
                 type='checkbox'
                 label={checkItem.label}
                 defaultChecked={checkItem.checked}
                 onChange={setCheck(i)}
                ></Form.Check>
            )) }
        </Form>

        
    )
}

export default DropdownChecklist
