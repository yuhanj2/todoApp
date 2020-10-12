import * as actionTypes from '../Constants/actionTypes'
import priorities from "../Constants/priorities";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

// redux initial state
const initialState = {
    todoItems: [],
    currContent: "",
    currPriority: "",
    currDueTime: "",
    currItem: null,
    edit: false,
    error: "",
    createNew: false,
    sortedPriority: false,
    sortedDueTime: false
}

const todoReducers = (state = initialState, action) => {
    let newTodoItems;
    let currIndex;
    switch(action.type){
        case actionTypes.ADD_ITEM:
            const newItem = {
                id: Date.now(),
                content: action.payload.content,
                priority: action.payload.priority,
                dueTime: action.payload.dueTime,
                notification: setTimeout(
                    () => alert(action.payload.content + "需要完成了"),
                    (action.payload.dueTime - Date.now()) )
            }
            return {
                ...state,
                todoItems: state.todoItems.concat(newItem),
                edit: false,
                sortedDueTime: false,
                sortedPriority: false
            }

        case actionTypes.TOGGLE_EDIT:
            return {
                ...state,
                edit: !state.edit
            }

        case actionTypes.SORT_BY_DUE_TIME:
            newTodoItems = state.todoItems.sort((a, b) => {
                if(a.dueTime < b.dueTime) return -1;
                if(a.dueTime > b.dueTime) return 1;
                if(a.priority < b.priority) return -1;
                if(a.priority > b.priority) return 1;
                return 0;
            })
            return {
                ...state,
                todoItems: newTodoItems,
                edit: false,
                sortedDueTime: true,
                sortedPriority: false
            }

        case actionTypes.SORT_BY_PRIORITY:
            newTodoItems = state.todoItems.sort((a, b) => {
                if(a.priority < b.priority) return -1;
                if(a.priority > b.priority) return 1;
                if(a.dueTime < b.dueTime) return -1;
                if(a.dueTime > b.dueTime) return 1;
                return 0;
            })
            return {
                ...state,
                todoItems: newTodoItems,
                edit: false,
                sortedDueTime: false,
                sortedPriority: true
            }

        case actionTypes.SET_CURR_ITEM:
            return {
                ...state,
                currItem: action.payload
            }

        case actionTypes.DELETE_ITEM:
            newTodoItems = [...state.todoItems];
            currIndex = newTodoItems.indexOf(action.payload);
            if (currIndex !== -1) {
                clearTimeout(action.payload.notification);
                newTodoItems.splice(currIndex, 1);
                return {
                    currContent: "",
                    currPriority: "",
                    currDueTime: "",
                    currItem: null,
                    edit: false,
                    todoItems: newTodoItems,
                    error: ""
                }
            } else {
                return {
                    ...state,
                    sortedDueTime: false,
                    sortedPriority: false
                }
            }

        case actionTypes.SET_NEW_PRIORITY:
            return {
                ...state,
                currPriority: action.payload
            }

        case actionTypes.SET_NEW_DUE_TIME:
            return {
                ...state,
                currDueTime: action.payload
            }

        case actionTypes.SET_NEW_CONTENT:
            return {
                ...state,
                currContent: action.payload
            }

        case actionTypes.TOGGLE_CREATE_NEW:
            return{
                ...state,
                createNew: !state.createNew
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.EDIT_ITEM:
            newTodoItems = [...state.todoItems];
            clearTimeout(state.currItem.notification);
            currIndex = newTodoItems.indexOf(state.currItem);
            if (currIndex !== -1) {
                newTodoItems[currIndex].content = state.currContent;
                newTodoItems[currIndex].dueTime = state.currDueTime;
                newTodoItems[currIndex].notification = setTimeout(() => alert(state.currContent + "需要完成了"),(state.currDueTime - Date.now()) );
                newTodoItems[currIndex].priority = state.currPriority;
                return {
                    currContent: "",
                    currPriority: "",
                    currDueTime: "",
                    currItem: null,
                    edit: false,
                    todoItems: newTodoItems,
                    error: ""
                }
            } else {
                return {
                    ...state,
                    sortedDueTime: false,
                    sortedPriority: false
                }
            }

        default:
            return state;
    }
}

export default todoReducers;