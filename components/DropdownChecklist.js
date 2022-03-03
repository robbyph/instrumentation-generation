import { Form, FormCheck, Button } from 'react-bootstrap'
import styles from '../styles/DropdownChecklist.module.scss'
import {useState, useEffect } from 'react'


const DropdownChecklist = ({ disabled, checkOptions, returnChecksState }) => {
    function setCheck(id) {
      var newArray = [...checkOptions];
      var newElement = checkOptions[id];
      newElement.checked = !newElement.checked;
      newArray[id] = newElement;
      returnChecksState(newArray);
    }
  
    return (
      <Form className={styles.checkMenu}>
        <fieldset disabled={disabled}>
          {checkOptions.map((checkItem, i) => (
            <Form.Check
              key={checkItem.label}
              id={i}
              type="checkbox"
              label={checkItem.label}
              checked={checkItem.checked}
              onChange={() => {
                setCheck(i);
              }}
            ></Form.Check>
          ))}
        </fieldset>
      </Form>
    );
  };

export default DropdownChecklist
