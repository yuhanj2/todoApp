import * as actionTypes from '../Constants/actionTypes'

export const addTodoItem = (newItem) => {
    console.log("Adding new todo item");
    return({
        type: actionTypes.ADD_ITEM,
        payload: newItem
    });
};

export const sortByPriority = () => {
    return({
        type:actionTypes.SORT_BY_PRIORITY
    });
}

export const sortByDueTime = () => {
    return({
        type:actionTypes.SORT_BY_DUE_TIME
    });
}

export const setNewContent = (newContent) => {
    // console.log("editing the content of an existing entry");
    return({
        type: actionTypes.SET_NEW_CONTENT,
        payload: newContent
    });
};

export const setNewPriority = (newPriority) => {
    // console.log("editing the priority of an existing entry");
    return ({
        type: actionTypes.SET_NEW_PRIORITY,
        payload: newPriority
    });
};

export const setNewDueTime = (newDueTime) => {
    // console.log("editing the due time of an existing entry");
    return ({
        type: actionTypes.SET_NEW_DUE_TIME,
        payload: newDueTime
    });
};

export const setCurrItem = (currItem) => {
    //console.log("set the current item that's under editing in redux state");
    return ({
        type: actionTypes.SET_CURR_ITEM,
        payload: currItem
    });
};

export const deleteItem = (item) => {
    console.log("deleting an existing todo item");
    return ({
        type: actionTypes.DELETE_ITEM,
        payload: item
    });
};

export const setError = (errorMessage) => {
    //console.log("There's an error, reporting it");
    return ({
        type: actionTypes.SET_ERROR,
        payload: errorMessage
    });
};

export const toggleCreateNew = () => {
    //console.log("toggle create new boolean");
    return ({
        type: actionTypes.TOGGLE_CREATE_NEW,
    });
};

export const editItem = () => {
    console.log("edit confirmed, editing existing entry");
    return ({
        type: actionTypes.EDIT_ITEM,
    });
};

export const toggleEdit = () => {
    //console.log("edit button has been clicked, showing the edit form");
    return ({
        type: actionTypes.TOGGLE_EDIT
    });
};