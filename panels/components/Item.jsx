import React, {useEffect, useState, useRef} from 'react';
import '../../styles/canvas.css';

function ToolbarButton(props) {
    return (
        <div className='toolbar-button' style={{...props.style}}>
            {props.children}
        </div>
    );
}

export default ToolbarButton;