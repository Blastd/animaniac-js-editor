import React, {useRef, useState, useEffect} from 'react';
import '../styles/timeline.css';

function Timeline(props) {
    let [scale, setScale] = useState (1);
    let rulerRef = useRef ();
    const increaseValue = 1;
    const maxValue = 30;

    let wheelEvent = function (e) {
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < 0 ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
    }

    let currScale = Math.ceil(document.querySelector ('.scale').clientWidth);
    let rulePos = Math.ceil((5 * currScale) * 10) / 10;
    let durationWidth = (currScale) + Math.ceil(((props.duration / 100)) * currScale );

    useEffect (()=>{
        rulerRef.current.style.setProperty ("--rulerPos", rulePos + 'px');
        rulerRef.current.style.setProperty ("--rulerTf", 1 + (scale / 10));
        rulerRef.current.style.setProperty ("--durationWidth", durationWidth + 'px');
    })

    return (
        <div className='app-panel app-timeline' style={{...props.style}} >
            <div className='timeline-action' style={{gridRow: 1}}>aaa</div>
            <div className="timeline-overflow" onWheel={wheelEvent}>
                <div className='timeline-stage' ref={rulerRef} style={{gridRow: 2}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Timeline;