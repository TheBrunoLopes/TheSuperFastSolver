/* **************************************************************************** */
/* ***********************     STATE   COPIES     ***************************** */
/* **************************************************************************** */

export function functionSCopy(functionS){
    let newFS = Object.assign({},functionS);
    newFS.functionsList = newFS.functionsList.map((functionObject) => Object.assign({}, functionObject));
    return newFS;
}