import React, {useEffect, useState, useRef} from 'react';
import '../../../styles/canvas.css';

export default function StageItem (props) {

    let itemRef = useRef ();
    let object = props.item;
    let [isMoving, setMoving] = useState (false);

    useEffect (()=> {
        itemRef.current.style.setProperty ('--posX', (object.position.x*props.zoom)+'px');
        itemRef.current.style.setProperty ('--posY', (object.position.y*props.zoom)+'px');
        itemRef.current.style.setProperty ('--scale', props.zoom);
    });

    let onSelect = (e) =>{
        props.selectAction (props.id);
        e.stopPropagation();
    }

    let onDown = (e) => {
        setMoving (true);
        e.preventDefault ();
        e.stopPropagation ();
    }

    let onMove = (e) => {
        if (!isMoving) return;
        props.setObjectPos (object.position.x + e.movementX, object.position.y + e.movementY);
    }

    let onUp = (e) => {

    }

    return (
        <div className={"stage-item " + (props.selected == props.id ? "active" : "")} ref={itemRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onClick={onSelect}>
            <img src={object.path}/>
        </div>
    )
}