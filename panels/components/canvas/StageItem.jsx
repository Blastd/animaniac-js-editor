import React, {useEffect, useState, useRef} from 'react';
import '../../../styles/canvas.css';

export default function StageItem (props) {

    let itemRef = useRef ();
    let object = props.item;
    let position = object.pending.position ? object.pending.position : object.position;
    //let rotation = object.pending.rotation ? object.pending.rotation : object.rotation;

    useEffect (()=> {
        itemRef.current.style.setProperty ('--posX', (position.x*props.zoom)+'px');
        itemRef.current.style.setProperty ('--posY', (position.y*props.zoom)+'px');
        itemRef.current.style.setProperty ('--scale', props.zoom);
        itemRef.current.classList.toggle ('active', props.selected == props.id);
        itemRef.current.classList.toggle ('pending', object.pending.position || object.pending.rotation || object.pending.scale);
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
        <div className={"stage-item"} ref={itemRef} onPointerDown={onDown} onPointerUp={onUp} onClick={onSelect}>
            <img src={object.path}/>
        </div>
    )
}