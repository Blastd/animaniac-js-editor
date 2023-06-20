import React from 'react';

function Toolbar(props) {
    return (
        <div className='app-panel app-toolbar' style={{...props.style}}>
            {props.children}
        </div>
    );
}

export default Toolbar;