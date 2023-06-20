import React from 'react';

function ToolbarButton(props) {
    return (
        <div className='toolbar-button' style={{...props.style}}>
            {props.children}
        </div>
    );
}

export default ToolbarButton;