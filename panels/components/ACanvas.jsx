import React, {useEffect, useState, useRef} from 'react';
import '../../styles/canvas.css';
import StageItem from './canvas/StageItem';

export default function ACanvas(props) {

    let [scrollX, setScrollX] = useState(0);
    let [scrollY, setScrollY] = useState(0);
    let [panning, setPanning] = useState(false);
    let [isDown, setDown] = useState (false);
    let [scale, setScale] = useState(1);
    let canvasRef = useRef();
    const increaseValue = 1;
    const maxValue = 30;
    const minValue = -5;

    let actualScale = 1 + (scale / 10);
    let width = props.animation.width;
    let height = props.animation.height;
    let uiWidth = width * actualScale;
    let uiHeight = height * actualScale;
    useEffect(()=>{
        canvasRef.current.style.setProperty('--canvasLeft', scrollX       + 'px');
        canvasRef.current.style.setProperty('--canvasTop', scrollY        + 'px');
        canvasRef.current.style.setProperty('--canvasScale', actualScale  + 'px');
        canvasRef.current.style.setProperty('--canvasWidth', uiWidth      + 'px');
        canvasRef.current.style.setProperty('--canvasHeight', uiHeight    + 'px');
    });

    let wheelEvent = function (e) {
        if (e.shiftKey) return;
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < minValue ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    let preventWheel = function (e) {
        return wheelEvent (e);
    }

    let panStart = (e) => {
        setPanning (true);
        e.preventDefault();
    }

    let panEnd = (e) => {
        setPanning (false);
        e.preventDefault();
    }

    let panMove = (e) => {
        if (panning) {
            setScrollX (scrollX + e.movementX);
            setScrollY (scrollY + e.movementY);
        } else if (isDown && props.workspace.selectedItem != null) {
            props.setElementPosition ((e.movementX) / actualScale, (e.movementY) / actualScale);
        }
    }

    return (
        <div className="canvas-container" onPointerMove={panMove} onPointerLeave={panEnd}>
            <div ref={canvasRef} className='canvas-element' onWheelCapture={preventWheel} onPointerDown={panStart} onPointerUp={panEnd} onBlur={panEnd} onClick={()=>props.selectAction(null)}>
                {
                    Object.keys(props.collection).map((id, index)=> {
                        return (<StageItem selectAction={props.selectAction} setDown={setDown} isDown={isDown} onItemMove={null} id={id} key={index} selected={props.workspace.selectedItem} item={props.collection[id]} zoom={actualScale}/>)
                    })
                }
            </div>
        </div>
    )
}