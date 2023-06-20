import React, {useState} from 'react';
import Toolbar from './panels/Toolbar';
import TitledList from './panels/components/TitledList';
import ToolbarButton from './panels/components/ToolbarButton';
import { MdAddAlarm, MdPersonAdd, MdCode } from 'react-icons/md';
import Timeline from './panels/Timeline';
import Numeric from './panels/components/inputs/Numeric';

function App() {

  let [isPlaying, setPlaying] = useState (false);
  let [isReverse, setReverse] = useState (false);
  let [project, setProject] = useState({
    animationProps: {
      duration: 3000
    }
  })

  function setProjectProps (key, value) {
    let backup = project;
    backup.animationProps[key] = value;
    setProject (backup);
  }

  return (
    <div className='app-main'>
        <Toolbar style={{gridRow: 1, gridColumn: 1}}>
          <ToolbarButton><MdAddAlarm size={30}/></ToolbarButton>
          <ToolbarButton><MdPersonAdd size={30}/></ToolbarButton>
          <ToolbarButton><MdCode size={30}/></ToolbarButton>
        </Toolbar>
        <div className='app-panel app-panel-container' style={{gridRowStart:1, gridRowEnd: 4}}>
          <TitledList title={"Elements"}>
            <a>asass</a>
          </TitledList>
          <TitledList title={"Animation"}>
            <Numeric label={"Duration"} min={0} max={10}/>
          </TitledList>
          <TitledList title={"Properties"}>
            <a>asass</a>
          </TitledList>
        </div>
        <Timeline style={{gridRow: 3}}/>
    </div>
  );
}

export default App;
