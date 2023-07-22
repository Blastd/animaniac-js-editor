import React, {useState} from 'react';
import Toolbar from './panels/Toolbar';
import TitledList from './panels/components/TitledList';
import ToolbarButton from './panels/components/ToolbarButton';
import { MdAddAlarm, MdPersonAdd, MdCode } from 'react-icons/md';
import Timeline from './panels/Timeline';
import Numeric from './panels/components/inputs/Numeric';
import {durationEvaluation, durationToTime} from './util/input/inputRules';
import ACanvas from './panels/components/ACanvas';

function App() {

  let [isPlaying, setPlaying] = useState (false);
  let [isReverse, setReverse] = useState (false);
  let [elements, setElements] = useState ({
      'asasas': {
        path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
        position: {x: 0, y: 70},
        rotation: 0,
        pending: {position: null, rotation: null, scale: null},
        keyframes: [
          {time: 0.312312, data:{transform: 'translate (120px, 120px)'}}
        ]
      },
      'osososo': {
        path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
        position: {x: 100, y: 0},
        rotation: 0,
        pending: {position: null, rotation: null, scale: null},
        keyframes: [
          {time: 0.312312, data:{transform: 'translate (120px, 120px)'}}
        ]
      }
  });

  let [project, setProject] = useState({
    animationProps: {
      duration: 3000,
      width: 1280,
      height: 768
    },
    workspace: {
      cursor: 0,
      element: -1,
      selectedItem: null
    }
  })

  /**
   * Sets the workspace's selected item to the specific id
   * @param {String} id 
   */
  function selectItem (id) {
    setWorkspaceProps('selectedItem', id);
  }

  /**
   * Sets a project property
   * @param {String} key param's name
   * @param {Object} value param's value
   */
  function setAnimationProps (key, value) {
    let backup = {...project};
    backup.animationProps[key] = value;
    setProject (backup);
  }

  /**
   * Sets a workspace property
   * @param {String} key param's name
   * @param {Object} value param's value
   */
  function setWorkspaceProps (key, value) {
    let backup = {...project};
    backup.workspace[key] = value;
    setProject (backup);
  }

  function setElementProps (id, key, value) {
    let backup = {...elements};
    backup[id][key] = value;
    setElements (backup);
  }

  function setElementPosition (deltaX, deltaY, isOrigin) {
    let backup = {...elements};
    let element = backup[project.workspace.selectedItem]
    if (isOrigin) {
      element.position.x += deltaX;
      element.position.y += deltaY;
    } else {
      if (element.pending.position == null) {
        element.pending.position = {...element.position};
      }
      element.pending.position.x += deltaX;
      element.pending.position.y += deltaY;
    }
    
    setElements (backup);
  }

  return (
    <div className='app-main'>
        <Toolbar style={{gridRow: 1, gridColumn: 1}}>
          <ToolbarButton><MdAddAlarm size={30}/></ToolbarButton>
          <ToolbarButton><MdPersonAdd size={30}/></ToolbarButton>
          <ToolbarButton><MdCode size={30}/></ToolbarButton>
        </Toolbar>
        <ACanvas animation={project.animationProps} workspace={project.workspace} 
          collection={elements} setElementProps={setElementProps} setElementPosition={setElementPosition} selectAction={selectItem}/>
        <div className='app-panel app-panel-container' style={{gridRowStart:1, gridRowEnd: 4}}>
          <TitledList title={"Elements"}>
            <a>asass</a>
          </TitledList>
          <TitledList title={"Animation"}>
            <Numeric label={"Duration"} min={1000} max={3600000} increment={10} action={durationEvaluation} default={project.animationProps.duration}
              property={'duration'} change={setAnimationProps}
              interpreter={durationToTime}/>
            <Numeric label={"Width"} min={1000} max={3840} increment={10} default={project.animationProps.width}
              property={'width'} change={setAnimationProps}/>
            <Numeric label={"Height"} min={1000} max={3840} increment={10} default={project.animationProps.height}
              property={'height'} change={setAnimationProps}/>
              <a>{JSON.stringify(project.workspace)}</a>
          </TitledList>
          <TitledList force={project.workspace.selectedItem == null ? false : null } title={"Properties"}>
            
          </TitledList>
        </div>
        <Timeline duration={project.animationProps.duration} collection={elements} change={setWorkspaceProps} cursor={'cursor'} project={project} style={{gridRow: 3}}/>
    </div>
  );
}

export default App;
