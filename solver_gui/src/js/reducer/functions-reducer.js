import {UPDATE_FUNCTIONS, UPDATE_SOLVED_FUNCTION} from "../actions/functions-actions";
import {functionSCopy} from "./stateUtils";

export default function functionsReducer(state = {},{type,payload}){
    let newState={};
    switch (type){
        case UPDATE_FUNCTIONS:
            newState=Object.assign({}, state);
            newState.functionsList=payload.functionsList;
            return newState;
        case UPDATE_SOLVED_FUNCTION:
            newState=functionSCopy(state);
            newState.solvedFunction=payload.solvedFunction;
            return newState;
        default:
            return state;
    }
}