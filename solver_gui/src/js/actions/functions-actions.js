import axios from 'axios';
import {API_PATHS} from "./endpoints";
import {errorToast, successToast} from "./Toasties";
export const UPDATE_FUNCTIONS       = 'functions:updateFunctions';
export const UPDATE_SOLVED_FUNCTION = 'functions:updateSolvedFunctions';

export function updateFunctions(newFunctions){
    return {
        type: UPDATE_FUNCTIONS,
        payload: {
            functionsList: newFunctions
        }
    };
}

export function updateSolvedFunctions(solvedFunction){
    return {
        type: UPDATE_SOLVED_FUNCTION,
        payload: {
            solvedFunction: solvedFunction
        }
    };
}


/**
 * GET, POST, PUT and DELETE actions
 * ***********************************
 */

/**
 * This function has two purposes. If given a name it retrieves the object that matched that name.
 * Else, it will return all functions provided by the solver_service
 * @param name: Name of the function
 * @returns {Function}
 */
export function getFunction(name) {
    return (dispatch, getState) => {
        apiGetFunctions(dispatch, getState, name);
    }
}

export function postFunction(functionObject) {
    return (dispatch, getState) => {
        apiPostFunctions(dispatch,getState,functionObject);
    }
}

export function putFunction(functionObject) {
    return (dispatch, getState) => {
        apiPutFunctions(dispatch, getState,functionObject);
    }
}

export function deleteFunction(name) {
    return (dispatch, getState) => {
        apiDeleteFunctions(dispatch, getState,name);
    }
}

export function solveFunction(functionObject) {
    return (dispatch, getState) => {
        apiSolveFunctions(dispatch, getState, functionObject);
    }
}

/* **************************************************************************** */
/* *************************      API CALLS       ***************************** */
/* **************************************************************************** */

function apiGetFunctions(dispatch, getState, name){
    axios({
        method:'get',
        url:API_PATHS.functionsPath(name),
        data:name,
    }).then(
        (response) => {
            dispatch(updateFunctions(response.data))
        }
    ).catch((error) => {
        if(error.response !== undefined)
        {
            errorToast(error.response.data);
        }
    });
}


function apiPostFunctions(dispatch, getState, functionObject){
    axios({
        method:'post',
        url:API_PATHS.functionsPath(),
        data:functionObject,
    }).then(
        (response) => {
            apiGetFunctions(dispatch, getState);
            successToast('Function defined with success');
        }
    ).catch((error) => {
        if(error.response !== undefined)
        {
            errorToast(error.response.data);
        }else {
            errorToast("No response from server");
        }
    });
}

function apiPutFunctions(dispatch, getState, functionObject){
    axios({
        method:'put',
        url:API_PATHS.functionsPath(),
        data:functionObject,
    }).then(
        (response) => {
            apiGetFunctions(dispatch, getState);
            successToast('Function updated with success');
        }
    ).catch((error) => {
        if(error.response !== undefined)
        {
            errorToast(error.response.data);
        }else {
            errorToast("No response from server");
        }
    });
}


function apiDeleteFunctions(dispatch, getState, name){
    axios({
        method:'delete',
        url:API_PATHS.functionsPath(name),
        data:name,
    }).then(
        () => {
            successToast('Function removed with success');
            apiGetFunctions(dispatch, getState);
        }
    ).catch((error) => {
        if(error.response !== undefined)
        {
            errorToast(error.response.data);
        }else {
            errorToast("No response from server");
        }
    });
}


function apiSolveFunctions(dispatch, getState, functionObject){
    axios({
        method:'post',
        url:API_PATHS.solver(),
        data:functionObject,
    }).then(
        (response) => {
            //successToast('Function solved with success');
            dispatch(updateSolvedFunctions(response.data));
        }
    ).catch((error) => {
        if(error.response !== undefined)
        {
            if(error.response.status === 400){
                //errorToast(error.response.data);
                dispatch(updateSolvedFunctions(error.response.data));
            }
            else{
                errorToast(error.response.data.detail);
            }
        }else {
            errorToast("No response from server");
        }
    });
}