import React, {useEffect, useState, useRef} from 'react';
import '../../styles/canvas.css';

export default function ACanvas(props) {

    let [scrollX, setScrollX] = useState(0);
    let [scrollY, setScrollY] = useState(0);
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
        canvasRef.current.style.setProperty('--canvasLeft', scrollX  + 'px');
        canvasRef.current.style.setProperty('--canvasTop', scrollY   + 'px');
        canvasRef.current.style.setProperty('--canvasScale', actualScale   + 'px');
        canvasRef.current.style.setProperty('--canvasWidth', uiWidth   + 'px');
        canvasRef.current.style.setProperty('--canvasHeight', uiHeight + 'px');
    });

    let wheelEvent = function (e) {
        if (e.altKey != true) return;
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < minValue ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
    }

    return (
        <div className="canvas-container">
            <div ref={canvasRef} className='canvas-element' onWheel={wheelEvent}>
            
            </div>
        </div>
    )
}