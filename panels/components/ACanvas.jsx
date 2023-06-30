import React, {useEffect, useState} from 'react';
import Toolbar from './panels/Toolbar';
import TitledList from './panels/components/TitledList';
import ToolbarButton from './panels/components/ToolbarButton';
import { MdAddAlarm, MdPersonAdd, MdCode } from 'react-icons/md';
import Timeline from './panels/Timeline';
import Numeric from './panels/components/inputs/Numeric';
import {durationEvaluation, durationToTime} from './util/input/inputRules';

export default function ACanvas() {

    let [scrollX, setScrollX] = useState(0);
    let [scrollY, setScrollY] = useState(0);
    let [scale, setScale] = useState(1);
    let canvasRef = useRef();
    const increaseValue = 1;
    const maxValue = 30;

    let actualScale = 1 + (zoom / 10);
    let width = props.width;
    let height = props.width;

    useEffect(()=>{
        canvasRef.current.style.setProperty('--canvasLeft', scrollX);
        canvasRef.current.style.setProperty('--canvasTop', scrollY);
        canvasRef.current.style.setProperty('--canvasScale', zoom);
        canvasRef.current.style.setProperty('--canvasWidth', width);
        canvasRef.current.style.setProperty('--canvasHeight', height);
    });

    let wheelEvent = function (e) {
        if (!e.ctrlKey) return;
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < 0 ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
    }

    return (
        <div ref={canvasRef} onWheel={wheelEvent}>
            
        </div>
    )
}