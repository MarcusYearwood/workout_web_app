import React, { useReducer, useState } from 'react';
import './App.css';
import Input, { Header, Add } from './Input.js'
import { ACTIONS } from './Actions';

const idSet = new Set()

// use id to label workouts. can identify by object.id cross referenced with woNum
// this will allow for intutive deletion feature 
function newID () {
  const setLength = idSet.size
  let newSetLength = idSet.size
  let tryRandID = 0
  while (setLength === newSetLength){
    tryRandID = Math.floor(Math.random()*Date.now())
    idSet.add(tryRandID)
    newSetLength = idSet.size
  }
  return tryRandID
}

const workoutSchema = {
  workout: "",
  sets: "0",
  reps: "0",
  variations: [],
  description: "",
  repsBySet: [],
  id: newID(),
  circuitID: -1
}

function onlyNum (str) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  let found = true
  if (!str) {
    return true
  }
  for (let i=0; i < str.length; i++) {
    found = numbers.find(element => element === str[i])
    if (!found) {
      return false
    }
  }
  return true
}

function removeZeros(string) {
  if (string.startsWith(0) && string.length > 1){
    return removeZeros(string.slice(1))
  } else {
    return string
  }
}

function getWorkoutTime (program) {
  let minutes = 0;
  const BETWEEN_WORKOUTS = 2.5
  const BETWEEN_SETS = 1
  const PER_REP = (1/15)

  for (let i=0; i < program.length; i ++) {
    minutes += BETWEEN_WORKOUTS
    for (let j=0; j < program[i].sets; j++){
      minutes += BETWEEN_SETS
    }
    for (let j=0; j < program[i].repsBySet[j]; j++){
      minutes += program[i].repsBySet[j] * PER_REP
    }
  }

  return minutes
}

function reducer (state, action) {
  let target = {value: "", name: ""}
  try {
    
  } catch (error) {
    if (error instanceof TypeError) {
    } else {
      throw error
    }
  }

  switch (action.type) {
    case ACTIONS.ADD_WORKOUT:
      return [...state, {
        workout: "",
        sets: "0",
        reps: "0",
        variations: [],
        description: "",
        repsBySet: [],
        id: newID(),
        circuitID: -1
      }]
    case ACTIONS.DELETE_WORKOUT:
      let id = action.payload.id
      const newState = state.filter(object => object.id !== id)
      return [...newState]
    case ACTIONS.CHANGE_WORKOUT:
      target = action.payload.target
      let value = target.value
      let name = target.name
      let woNum = parseInt(name.replace(/\D/g,''))
      let newChar = value.slice(-1)
      console.log(state);
      return state.map((object, index) => {
        if (object.id === woNum) {
          return {...object, workout: value}
        } else {
          return object
        }
      })
    case ACTIONS.CHANGE_SETS:
      target = action.payload.target
      value = target.value
      name = target.name
      woNum = parseInt(name.replace(/\D/g,''))
      newChar = value.slice(-1)
      if (onlyNum(value)) {
        if (!newChar) {
          value = "0"
        }
        value = removeZeros(value)
        return state.map((object, index) => {
          if (object.id === woNum) {
            return {...object, sets: value, repsBySet: new Array(parseInt(value)).fill(object.reps)}
          } else {
            return object
          }
        })
      } else {
        return [...state]
      }
    case ACTIONS.CHANGE_REPS:
      console.log(getWorkoutTime(state))
      target = action.payload.target
      value = target.value
      woNum = action.payload.id
      newChar = value.slice(-1)
      if (onlyNum(value)) {
        if (!newChar) {
          value = "0"
        }
        value = removeZeros(value)
        return state.map((object) => {
          if (object.id === woNum) {
            return {...object, reps: value, repsBySet: object.repsBySet.fill(value)}
          } else {
            return object
          }
        })
      } else {
        return [...state]
      }
    case ACTIONS.ADD_VARIATION:
      return state.map((object, index) => {
        if (object.id === action.payload.id) {
          return {...object, variations: [...object.variations, action.payload.variation]}
        } else {
          return object
        }
      })
    case ACTIONS.DELETE_VARIATION:
      target = action.payload.target
      name = target.className
      let varIdx;
      [varIdx, woNum] = name.split(".").map(element => parseInt(element))
      return state.map((object, index) => {
        if (object.id === woNum) {
          return {...object, variations: [...object.variations.filter((variation, index) => index !== varIdx)]}
        } else {
          return object
        }
      })
    case ACTIONS.CHANGE_DESCRIPTION:
      target = action.payload.target
      value = target.value
      name = target.name
      woNum = parseInt(name.replace(/\D/g,''))
      newChar = value.slice(-1)
      return state.map((object, index) => {
        if (object.id === woNum) {
          return {...object, description: value}
        } else {
          return object
        }
      })
    case ACTIONS.CHANGE_REPS_PER_SET:
      target = action.payload.target
      value = target.value
      name = target.name
      let indexOfSet;
      [indexOfSet, woNum] = name.split(".").map(element => parseInt(element))
      newChar = value.slice(-1)
      if (onlyNum(value)) {
        if (!newChar) {
          value = "0"
        }
        return state.map((object, index) => {
          if (object.id === woNum) {
            value = removeZeros(value)
            object.repsBySet[indexOfSet] = value;
            return {...object, repsBySet: [...object.repsBySet]}
          } else {
            return object
          }
        })
        } else {
          return [...state]
        }
    case ACTIONS.ADD_TO_CIRCUIT:
      return state.map((object) => {
        if (object.id === action.payload.WorkoutID) {
          if (action.payload.CircuitID === action.payload.ObjectCircuitID) {
            return {...object, circuitID: -1}
          } else {
            return {...object, circuitID: action.payload.CircuitID}
          }
        } else {
          return object
        }
      })
    default:
      return alert("there is an error")
  }
}

function Form2 () {
  const [state, dispatch] = useReducer(reducer, [workoutSchema])
  const [variation, setVariation] = useState("")
  const [showCircuitMode, toggleCircuitMode] = useState(false)
  const [currentCircuitID, setCircuitID] = useState(-1)

  function handleSubmit (e) {
    e.preventDefault()
    dispatch({ type:ACTIONS.ADD_WORKOUT })
  }
  
  const inputs = state.map((object, index) => {
    return (<Input currentCircuitID={currentCircuitID} showCircuitMode={showCircuitMode} key={index} pname={index} dispatch={ dispatch } object={object} variation={variation} setVariation={setVariation} />)
  })

  return (<form>
    <div className='container'>
      <Header />
      {inputs}
    </div>
    <Add setCircuitID={setCircuitID} handleSubmit={handleSubmit} showCircuitMode={showCircuitMode} toggleCircuitMode={toggleCircuitMode} />
  </form>)
}

function App() {
  return (
    <div className="App">
      <Form2 />
    </div>
  );
}

export default App;
