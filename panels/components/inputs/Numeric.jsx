import React from 'react';
import '../../../styles/input.css';

function Numeric(props) {
    return (
        <div className='property-input' style={{...props.style}}>
            <label>{props.label}</label><input type='number' min={props.min} max={props.max} defaultValue={props.default} onChange={(e)=>props.change(props.property, e.target.value)}></input>
        </div>
    );
}

export default Numeric;