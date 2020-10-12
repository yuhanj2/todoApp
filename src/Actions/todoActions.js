import * as actionTypes from '../Constants/actionTypes'

// redux actions

// 添加新待办事项的redux action
export const addTodoItem = (newItem) => {
    console.log("Adding new todo item");
    return({
        type: actionTypes.ADD_ITEM,
        payload: newItem
    });
};

// 按照优先级排序的redux action
export const sortByPriority = () => {
    return({
        type:actionTypes.SORT_BY_PRIORITY
    });
}

// 按照截止时间排序的redux action
export const sortByDueTime = () => {
    return({
        type:actionTypes.SORT_BY_DUE_TIME
    });
}

// 改变现在选中事项的内容的redux action
export const setNewContent = (newContent) => {
    // console.log("editing the content of an existing entry");
    return({
        type: actionTypes.SET_NEW_CONTENT,
        payload: newContent
    });
};

// 改变现在选中事项的优先级的redux action
export const setNewPriority = (newPriority) => {
    // console.log("editing the priority of an existing entry");
    return ({
        type: actionTypes.SET_NEW_PRIORITY,
        payload: newPriority
    });
};

// 改变现在选中事项的截止时间的redux action
export const setNewDueTime = (newDueTime) => {
    // console.log("editing the due time of an existing entry");
    return ({
        type: actionTypes.SET_NEW_DUE_TIME,
        payload: newDueTime
    });
};

// 选中一个事项准备编辑的redux action
export const setCurrItem = (currItem) => {
    //console.log("set the current item that's under editing in redux state");
    return ({
        type: actionTypes.SET_CURR_ITEM,
        payload: currItem
    });
};

// 删除选中事项的redux action
export const deleteItem = (item) => {
    console.log("deleting an existing todo item");
    return ({
        type: actionTypes.DELETE_ITEM,
        payload: item
    });
};

// 编辑错误信息的redux action
export const setError = (errorMessage) => {
    //console.log("There's an error, reporting it");
    return ({
        type: actionTypes.SET_ERROR,
        payload: errorMessage
    });
};

// 反向createNew布尔值的redux action，用于显示/隐藏添加新待办菜单
export const toggleCreateNew = () => {
    //console.log("toggle create new boolean");
    return ({
        type: actionTypes.TOGGLE_CREATE_NEW,
    });
};

// 确认编辑现在选中的事项
export const editItem = () => {
    console.log("edit confirmed, editing existing entry");
    return ({
        type: actionTypes.EDIT_ITEM,
    });
};

// 反向 edit 的布尔值，用于显示/隐藏编辑待办菜单
export const toggleEdit = () => {
    //console.log("edit button has been clicked, showing the edit form");
    return ({
        type: actionTypes.TOGGLE_EDIT
    });
};