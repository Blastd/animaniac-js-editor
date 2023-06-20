import React, {useRef, useState, useEffect} from 'react';

function Timeline(props) {
    let [scale, setScale] = useState (1);
    let rulerBigRef = useRef ();
    let rulerRef = useRef ();
    const increaseValue = 0.2;
    const maxValue = 2;

    let wheelEvent = function (e) {
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) <= 0.3 ? scale : Math.ceil((scale - increaseValue) * 10) / 10)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : Math.ceil((scale + increaseValue) * 10) / 10)
        }
    }

    useEffect (()=>{
        let currScale = document.querySelector ('.scale').clientWidth;
        rulerBigRef.current.style.setProperty ("--rulerPosBig", (scale * currScale * 5) + 'px');
        rulerRef.current.style.setProperty ("--rulerPos", (scale * currScale) + 'px');
        rulerBigRef.current.style.setProperty ("--rulerSizeBig", (scale * 2) + 'px');
        rulerRef.current.style.setProperty ("--rulerSize", (scale * 2) + 'px');
    })

    return (
        <div className='app-panel app-timeline' style={{...props.style}} >
            <div className='timeline-action' style={{gridRow: 1}}>aaa</div>
            <div className='timeline-stage' ref={rulerBigRef} style={{gridRow: 2}} onWheel={wheelEvent}>
                <div className="small-ruler" ref={rulerRef}></div>
            </div>
        </div>
    );
}

export default Timeline;