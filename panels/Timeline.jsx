import React, {useRef, useState, useEffect} from 'react';
import '../styles/timeline.css';

function Timeline(props) {
    let [scale, setScale] = useState (1);
    let rulerBigRef = useRef ();
    let rulerRef = useRef ();
    const increaseValue = 2;
    const maxValue = 9;

    let wheelEvent = function (e) {
        if (e.deltaY > 0) {
            setScale ((scale - increaseValue) < 1 ? scale : scale - increaseValue)
        } else {
            setScale ((scale + increaseValue) >= maxValue ? scale : scale + increaseValue)
        }
    }

    useEffect (()=>{
        let currScale = Math.ceil(document.querySelector ('.scale').clientWidth);
        let rulePosBig = Math.ceil((5 * scale * currScale) * 10) / 10;
        let rulePos = Math.ceil((scale * currScale) * 10) / 10;
        let ruleMarkerSize = Math.ceil(scale * 10) / 10;
        let durationWidth = Math.ceil(((1 + props.duration) / 100) * currScale * scale * 100) / 100;
        rulerBigRef.current.style.setProperty ("--rulerPosBig", rulePosBig + 'px');
        rulerRef.current.style.setProperty ("--rulerPos", rulePos + 'px');
        rulerBigRef.current.style.setProperty ("--rulerSize", ruleMarkerSize + 'px');
        rulerRef.current.style.setProperty ("--rulerSize", ruleMarkerSize + 'px');
        rulerRef.current.style.setProperty ("--durationWidth", durationWidth + 'px');
        rulerBigRef.current.style.setProperty ("--durationWidth", durationWidth + 'px');
    })

    return (
        <div className='app-panel app-timeline' style={{...props.style}} >
            <div className='timeline-action' style={{gridRow: 1}}>aaa</div>
            <div className="timeline-overflow">
                <div className='timeline-stage' ref={rulerBigRef} style={{gridRow: 2}} onWheel={wheelEvent}>
                    <div className="small-ruler" ref={rulerRef}></div>
                </div>
            </div>
        </div>
    );
}

export default Timeline;