import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/input.css';

function Numeric(props) {

    let [interpreted, setInterpreted] = useState('');
    let [value, setValue] = useState(props.default);

    let inputRef = useRef();

    let changeEvent = (e) => {
        let finalValue = e.target.value;
        setValue (finalValue);
    };

    let saveValue = (value) => {
        let finalValue = value;
        // Elaborate data into a compatible value if needed
        if (props.action != null) {
            console.log (finalValue);
            finalValue = props.action(finalValue);
            console.log (finalValue);
        }

        setValue (finalValue);

        if (!Number.isNaN(parseFloat(finalValue))) {
            props.change(props.property, finalValue);
        }

        if (props.interpreter != null) {
            setInterpreted (props.interpreter (finalValue));
        }
    }

    let keyEvent = (e) => {
        if (e.key && e.key === 'Enter') {
            saveValue (e.target.value);
        } else if (!e.key) {
            saveValue (e.target.value);
        }
    };

    return (
        <div className='property-input' style={{...props.style}}>
            <label>{props.label}</label>
            <input ref={inputRef} type={'text'} min={props.min} max={props.max} step={props.increment ?? 2} value={value}
             onChange={changeEvent} onBlur={keyEvent} onKeyDown={keyEvent}></input>
            {props.interpreter && (<label>{interpreted}</label>)}
        </div>
    );
}

export default Numeric;