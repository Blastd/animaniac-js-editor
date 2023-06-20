import React from 'react';

function Numeric(props) {
    return (
        <div className='property-input' style={{...props.style}}>
            <label>{props.label}<input type='number' min={props.min} max={props.max} onChange={(e)=>console.log('change', e)}></input></label>
        </div>
    );
}

export default Numeric;