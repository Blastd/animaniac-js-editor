import React from 'react';
import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function TitledList(props) {

    let [isOpen, setOpen] = useState (true);
    let [height, setHeight] = useState (props.defaultHeigth ?? 200);

    return (
        <div style={{...props.style}} className='app-lateral-toolbar'>
            <div className='toolbar-title' onClick={()=>setOpen (!isOpen)} style={{cursor: 'pointer'}}>
                {isOpen ? <MdExpandLess/> : <MdExpandMore/>}
                <span>{props.title}</span>
                </div>
            <Rnd className='list-container' style={{position: 'block'}} disableDragging={true}
                enableResizing={{top: false, bottom: true, left: false, right: false}}
                default={{x: 0, y: 27, height: 200}} size={{height: isOpen ? height : 0}} minHeight={5} maxHeight={window.innerHeight / 3.7}
                onResizeStart={()=>setOpen(true)}
                onResizeStop={(e, direction, ref, delta, position)=>{
                    let size = parseInt(ref.style.height.replace('px', ''));
                    if (size <= 10) {
                        setOpen (false)
                    } else {
                        setHeight(ref.style.height)
                    }}}>
                {props.children}
            </Rnd>
        </div>
    )
}

export default TitledList;