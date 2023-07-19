import React, {useEffect, useState, useRef} from 'react';
import '../../../styles/canvas.css';

export default function StageItem (props) {

    let itemRef = useRef ();
    let object = props.item;

    useEffect (()=> {
        itemRef.current.style.setProperty ('--posX', (30*props.zoom)+'px');
        itemRef.current.style.setProperty ('--posY', (30*props.zoom)+'px');
        itemRef.current.style.setProperty ('--scale', props.zoom);
    });

    let onSelect = (e) =>{
        props.selectAction (props.id);
        e.stopPropagation();
    }

    return (
        <div className={"stage-item " + (props.selected == props.id ? "active" : "")} ref={itemRef} onClick={onSelect}>
            <img src={object.path}/>
        </div>
    )
}