import React, {useEffect, useState, useRef} from 'react';
import '../../../styles/canvas.css';

export default function StageItem (props) {

    let itemRef = useRef ();
    let object = props.item;

    useEffect (()=> {
        itemRef.current.style.setProperty ('--posX', (object.position.x*props.zoom)+'px');
        itemRef.current.style.setProperty ('--posY', (object.position.y*props.zoom)+'px');
        itemRef.current.style.setProperty ('--scale', props.zoom);
    });

    let onSelect = (e) =>{
        props.selectAction (props.id);
        e.stopPropagation ();
    }

    let onDown = (e) => {
        props.setDown (true);
        e.preventDefault ();
        e.stopPropagation ();
    }

    let onUp = (e) => {
        props.setDown (false);
        e.preventDefault ();
        e.stopPropagation ();
    }

    return (
        <div className={"stage-item " + (props.selected == props.id ? "active" : "")} ref={itemRef} onPointerDown={onDown} onPointerUp={onUp} onClick={onSelect}>
            <img src={object.path}/>
        </div>
    )
}