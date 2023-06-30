import React, {useRef, useState, useEffect} from 'react';
import '../styles/timeline.css';
import {MdNearMe} from 'react-icons/md';

function Timeline(props) {
    let [scale, setScale] = useState (1);
    let [cursor, setCursor] = useState (1);
    let [isCursorDown, setCursorDown] = useState(false);
    let rulerRef = useRef ();
    let cursorRef = useRef ();
    let rulerOverflow = useRef ();
    const increaseValue = 1;
    const maxValue = 30;

    let wheelEvent = function (e) {
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < 0 ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
    }
    // Calcoliamo a quanto corrisponde 1/5 di secondo
    let decimalScale = (1+(scale/10));
    // Recuperiamo la scala di 0.5rem in px
    let currScale = Math.ceil(document.querySelector ('.scale').clientWidth);
    // Calcoliamo a quanto corrisponde 1 secondo (0.5rem * 5) in px scalati
    let widthPerSecond = (Math.ceil((5 * currScale) * 10) / 10) * decimalScale; // 5 = 5 segmenti tra 1 decina e 4 unità
    // Recuperiamo quanti quinti di secondo avremmo
    let durationCount = Math.floor(((props.duration / 100)));
    // Recuperiamo quanti px avremmo (px per 1/5 di secondo scalato * tot quinti di secondi)
    let durationWidth = (currScale * decimalScale) * durationCount;
    // Calcoliamo quanti px si deve spostare il cursore in modo da selezionare il dato corretto
    let offsetPx = cursor * durationWidth;

    console.log(decimalScale, currScale, widthPerSecond, durationCount, durationWidth, offsetPx);

    let clickCursor = function (e) {
        cursorAction (e);
    };

    let cursorMove = function (e) {
        if (!isCursorDown) {return;}
        cursorAction (e);
    }

    let cursorAction = function (e) {
        if (!e.target.className.includes('timeline-stage')) { return; }
        let currScale = Math.ceil(document.querySelector ('.scale').clientWidth);
        let durationWidth = Math.ceil(((props.duration / 100)) * currScale );
        let bounds = e.target.getBoundingClientRect();
        let actualCoordinateX = e.clientX + e.target.scrollLeft - bounds.left;
        let actualScale = 1 + (scale / 10);
        let width = durationWidth * actualScale; // Actual width in px * current scale
        let cursorPos = actualCoordinateX / width;
        setCursor (cursorPos);
    };

    let scrollToCursor = function (e) {
        let currScale = Math.ceil(document.querySelector ('.scale').clientWidth);
        let durationWidth = (currScale) + Math.ceil(((props.duration / 100)) * currScale );
        rulerOverflow.current.scrollTo ({left: (cursor * durationWidth * (1 + (scale / 10))) - (currScale), behavior: 'smooth'});
    };

    useEffect (()=>{
        rulerRef.current.style.setProperty ("--secondsWidth", widthPerSecond + 'px');
        rulerRef.current.style.setProperty ("--durationWidth", durationWidth + 'px');
        cursorRef.current.style.setProperty ("--cursorOffset", offsetPx + 'px');
        cursorRef.current.style.setProperty ("--cursorTf", 1/ (1 + (scale / 10)));
    })

    return (
        <div className='app-panel app-timeline' style={{...props.style}} >
            <div className='timeline-action' style={{gridRow: 1}}>
                <span className='interactable action action-cursor' onClick={scrollToCursor} title='Localizza cursore'>
                    <MdNearMe/>{((Number)(cursor * props.duration)).toFixed (3)}
                </span>
            </div>
            <div className="timeline-overflow" ref={rulerOverflow} onWheel={wheelEvent}>
                <div className='timeline-stage' ref={rulerRef} style={{gridRow: 2}} onClick={clickCursor}
                onPointerDown={()=>setCursorDown(true)} onPointerUp={()=>setCursorDown(false)}
                onPointerMove={cursorMove} onPointerCancel={()=>setCursorDown(false)} onPointerLeave={()=>setCursorDown(false)}>
                    <div className='timeline-cursor' ref={cursorRef}/>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Timeline;