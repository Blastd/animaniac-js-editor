import React, {useEffect, useState, useRef} from 'react';
import '../../../styles/canvas.css';

export default function StageItem (props) {
    let [selected, setSelected] = useState (false);

    let itemRef = useRef ();
    let object = props.item;

    useEffect (()=> {
        itemRef.current.style.setProperty ('--posX', (30*props.zoom)+'px');
        itemRef.current.style.setProperty ('--posY', (30*props.zoom)+'px');
        itemRef.current.style.setProperty ('--scale', props.zoom);
    });

    return (
        <div className={"stage-item " + (selected ? "active" : "")} ref={itemRef} onClick={()=>setSelected(true)}>
            <img src={object.imgPath}/>
        </div>
    )
}