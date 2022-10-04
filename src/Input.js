import { CSSTransition } from 'react-transition-group'
import React, { useState } from 'react'
import { ACTIONS } from './Actions.js'
import './Input.css'


export default function Input (props) {
    const [showBottom, setShowBottom] = useState(false)

    return (
        <div className='workout-row'>
            <TopRowInput currentCircuitID={props.currentCircuitID} showCircuitMode={props.showCircuitMode} prop={props} setShowBottom={setShowBottom} showBottom={showBottom} />
            <CSSTransition
                in={showBottom}
                classNames="menu"
                unmountOnExit
                timeout={1000}>
                <BottomRowInput prop={props} variation={props.variation} setVariation={props.setVariation} />
            </CSSTransition>
        </div>
    )
}

export function Header () {
return (<div className='row header'>
    <h1 className='col-5'>EXERCISE</h1>
    <h1 className='col-4'>SETS</h1>
    <h1 className='col-3'>REPS</h1>
</div>)
}

export function Add (props) {
    return (
        <div className='add-button-container'>
            <div className='add-button-background'>
                <div onClick={props.handleSubmit} className='add-workout'>Workout</div>
                <CircuitButton setCircuitID={props.setCircuitID} showCircuitMode={props.showCircuitMode} toggleCircuitMode={props.toggleCircuitMode} />
            </div>
        </div>
    )
}

function CircuitButton (props) {
    if (props.showCircuitMode) {
        return (<div onClick={() => {
            props.toggleCircuitMode(!props.showCircuitMode)}} className='add-circuit end-circuit-mode-button'>Done</div>)
    } else {
        return (<div onClick={() => {
            props.toggleCircuitMode(!props.showCircuitMode)
            props.setCircuitID(newCircuitID())
            }} className='add-circuit'>Circuit</div>)
    }
}

function TopRowInput (props) {
return (<div className='row input-row'>
    <div className='delete-hitbox' onClick={(e) => props.prop.dispatch({ type: ACTIONS.DELETE_WORKOUT, payload: { id: props.prop.object.id } })}>
        <svg className='trash-can' id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.85 63.67"><defs></defs><g><path d="M19.41,4.4v-1.69c0-1.22,.99-2.2,2.2-2.2h10.66c1.22,0,2.2,.99,2.2,2.2v1.69h-15.07Z"/><path d="M32.27,1c.94,0,1.7,.76,1.7,1.7v1.19h-14.07v-1.19c0-.94,.76-1.7,1.7-1.7h10.66m0-1h-10.66c-1.49,0-2.7,1.21-2.7,2.7v2.19h16.07V2.7c0-1.49-1.21-2.7-2.7-2.7h0Z"/></g><g><rect x=".5" y="3.95" width="51.85" height="6.59" rx="2.64" ry="2.64"/><path d="M49.71,4.45c1.18,0,2.14,.96,2.14,2.14v1.3c0,1.18-.96,2.14-2.14,2.14H3.14c-1.18,0-2.14-.96-2.14-2.14v-1.3c0-1.18,.96-2.14,2.14-2.14H49.71m0-1H3.14c-1.74,0-3.14,1.41-3.14,3.14v1.3c0,1.74,1.41,3.14,3.14,3.14H49.71c1.74,0,3.14-1.41,3.14-3.14v-1.3c0-1.74-1.41-3.14-3.14-3.14h0Z"/></g><g><path d="M15.03,63.17c-3.35,0-6.13-2.51-6.47-5.84L4.11,13.81H49.78l-4.45,43.52c-.34,3.33-3.12,5.84-6.47,5.84H15.03Z"/><path d="M49.23,14.31l-4.39,42.97c-.31,3.08-2.88,5.39-5.97,5.39H15.03c-3.09,0-5.66-2.32-5.97-5.39L4.66,14.31H49.23m1.11-1H3.55l4.51,44.07c.37,3.57,3.38,6.29,6.97,6.29h23.83c3.59,0,6.6-2.72,6.97-6.29l4.51-44.07h0Z"/></g><path className="cls-1" d="M37.88,45.5c0,.66-.25,1.31-.75,1.81-1,1-2.62,1-3.63,0l-6.55-6.55-6.55,6.55c-1,1-2.63,1-3.64,0-.5-.5-.75-1.16-.75-1.81s.25-1.32,.75-1.82l6.55-6.55-6.06-6.05c-.5-.5-.75-1.16-.75-1.82s.25-1.31,.75-1.81c1.01-1,2.63-1,3.64,0l6.06,6.06,6.05-6.06c1-1,2.63-1,3.64,0,.5,.5,.75,1.16,.75,1.81s-.25,1.32-.75,1.82l-6.05,6.06,6.54,6.54c.5,.5,.75,1.16,.75,1.82Z"/></svg>
    </div>
    <input placeholder='exercise' name={"workout" + props.prop.object.id} type="text" value={props.prop.object.workout} onChange={(e) => props.prop.dispatch({ type: ACTIONS.CHANGE_WORKOUT, payload: { target: e.target, id: props.prop.object.id } })} className="col-5" autoComplete="off"></input>
    <input placeholder='sets' name={"sets" + props.prop.object.id} type="text" value={props.prop.object.sets} onChange={(e) => props.prop.dispatch({ type: ACTIONS.CHANGE_SETS, payload: { target: e.target, id: props.prop.object.id } })} className="col-4" autoComplete="off"></input>
    <input placeholder='reps' name={"reps"} type="text" value={props.prop.object.reps} onChange={(e) => props.prop.dispatch({ type: ACTIONS.CHANGE_REPS, payload: { target: e.target, id: props.prop.object.id } })}  className="col-3" autoComplete="off"></input>
    <CSSTransition in={props.showBottom} timeout={400} classNames="drop-arrow">
        <div className='dropdown-hitbox' onClick={() => props.setShowBottom(!props.showBottom)}><svg className="dropdown-triangle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 82.77"><defs></defs><polygon points="50 82.77 100 0 0 0 50 82.77"/></svg></div>
    </CSSTransition>
    <CircuitBorder dispatch = {props.prop.dispatch} showCircuitMode = {props.showCircuitMode} object = {props.prop.object} currentCircuitID = {props.currentCircuitID} />
</div>)
}

function CircuitBorder (props) {
    if (props.currentCircuitID === props.object.circuitID) {
        if (props.showCircuitMode) {
            return (
                <div className='border-clicked' onClick={() => props.dispatch({ type: ACTIONS.ADD_TO_CIRCUIT, payload: { WorkoutID: props.object.id, CircuitID: props.currentCircuitID, ObjectCircuitID: props.object.circuitID} })}></div>
            )
        }
    } else {
        if (props.showCircuitMode) {
            return (
                <div className='border-unclicked' onClick={() => props.dispatch({ type: ACTIONS.ADD_TO_CIRCUIT, payload: { WorkoutID: props.object.id, CircuitID: props.currentCircuitID, ObjectCircuitID: props.object.circuitID} })}></div>
            )
        }
    }
}

const circuitIDSet = new Set()

// use id to label workouts. can identify by object.id cross referenced with woNum
// this will allow for intutive deletion feature 
function newCircuitID () {
  const setLength = circuitIDSet.size
  let newSetLength = circuitIDSet.size
  let tryRandID = 0
  while (setLength === newSetLength){
    tryRandID = Math.floor(Math.random()*Date.now())
    circuitIDSet.add(tryRandID)
    newSetLength = circuitIDSet.size
  }
  return tryRandID
}

function handleAddVariation (variation, dispatch, id) {
    if (variation !== "") {
        dispatch({ type: ACTIONS.ADD_VARIATION, payload: {id: id, variation: variation} })
    }
}

function BottomRowInput (props) {
    const repsBySet = props.prop.object.repsBySet
    return (<div className='row dropdown-row'>
    <div className='variations col-4'>
        <div>
            {props.prop.object.variations.map((element, index) => <p key={index} className={index + "." + props.prop.object.id} onClick={(e) => props.prop.dispatch({ type: ACTIONS.DELETE_VARIATION, payload: {target: e.target} })} name={props.prop.object.id + index}>{element}</p>)}
        </div>
        <input name={'add-variation'+props.prop.object.id} value={props.variation} onChange={(e) => props.setVariation(e.target.value)} className='add-variation' autoComplete='off' type="text"></input>
        <div name={props.prop.object.id} className='add-hitbox' onClick={() => handleAddVariation(props.variation, props.setVariation, props.prop.dispatch, props.prop.object.id)} >
            <svg name={props.prop.object.id} className='add-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect name={props.prop.object.id} x="39.63" width="23.77" height="100" rx="11.88" ry="11.88"/><rect className='add-icon-inner' x="38.02" y="0" width="23.77" height="100" rx="11.88" ry="11.88" transform="translate(99.9 .1) rotate(90)"/></svg>
        </div>
    </div>
    <div className='description col-4'>
        <textarea type="text" value={props.prop.object.description} onChange={(e) => props.prop.dispatch( {type:ACTIONS.CHANGE_DESCRIPTION, payload: { target: e.target }} )} placeholder='Description' name={"description" + props.prop.object.id}></textarea>
    </div>
    <div className='reps-by-set col-3'>
        {repsBySet.map((element, index) => <input key={index} onChange={ (e) => props.prop.dispatch( {type:ACTIONS.CHANGE_REPS_PER_SET, payload:{ target: e.target }} ) } name={index + "." + props.prop.object.id} value={props.prop.object.repsBySet[index]}></input>)}
    </div>
</div>)
}
