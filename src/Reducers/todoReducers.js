import * as actionTypes from '../Constants/actionTypes'

// redux initial state
const initialState = {
    todoItems: [], // 一开始没有任何待办事项，所以是空数组
    currContent: "", // 正在被编辑的那条待办事项的内容，可以更改
    currPriority: "", // 正在被编辑的那条待办事项的优先级，可以更改
    currDueTime: "", // 正在被编辑的那条待办事项的截止时间，可以更改
    currItem: null, // 现在正在被编辑的那条待办事项
    edit: false, // 是否正在编辑某一条待办事项，控制编辑菜单的出现/消失
    error: "", // 给用户看到的错误信息
    createNew: false, // 用来控制添加新待办菜单是否显示在屏幕上
    sortedPriority: false, // 用来表示待办事项列表是否已经按照优先级排序过了
    sortedDueTime: false // 用来表示待办事项列表是否已经按照截止时间排序过了
}

// redux reducers
const todoReducers = (state = initialState, action) => {
    let newTodoItems;
    let currIndex;
    switch(action.type){
        // 添加新的待办事项到state.todoItems，会打乱两种排序的顺序
        case actionTypes.ADD_ITEM:
            const newItem = {
                id: Date.now(),
                content: action.payload.content,
                priority: action.payload.priority,
                dueTime: action.payload.dueTime,
                // 用于在网页上弹窗提醒事件已经到了截止时间，查阅了setTimeout的语法：https://javascript.info/settimeout-setinterval
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

        // 改变正在编辑的状态，如果编辑菜单正在显示，隐藏它，如果编辑菜单不在，显示它
        case actionTypes.TOGGLE_EDIT:
            return {
                ...state,
                edit: !state.edit
            }

        // 按照截止时间来重新排序待办事件列表
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

        // 按照优先级别来重新排序列表
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

        // 将现在正在被编辑的待办事项设为currItem
        case actionTypes.SET_CURR_ITEM:
            return {
                ...state,
                currItem: action.payload
            }

        // 删除现在被选中的那条待办事项
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

        // 改变现在的优先级，不到最后提交编辑就不会改变事件的优先级
        case actionTypes.SET_NEW_PRIORITY:
            return {
                ...state,
                currPriority: action.payload
            }

        // 改变现在的截止时间，不到最后提交编辑就不会改变事件的截止时间
        case actionTypes.SET_NEW_DUE_TIME:
            return {
                ...state,
                currDueTime: action.payload
            }

        // 改变现在的内容，不到最后提交编辑就不会改变事件的内容
        case actionTypes.SET_NEW_CONTENT:
            return {
                ...state,
                currContent: action.payload
            }

        // 改变添加新事件状态，如果添加菜单正在显示，隐藏它，如果添加菜单不在，显示它
        case actionTypes.TOGGLE_CREATE_NEW:
            return{
                ...state,
                createNew: !state.createNew
            }

        // 改变报错信息，展示在编辑文本框中
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }

        // 确认编辑现在选中的事项，会打乱排序好的顺序，需要重新排序
        case actionTypes.EDIT_ITEM:
            newTodoItems = [...state.todoItems];
            // 将之前设好的提醒去除，因为事项已经被编辑过，截止时间可能有变化
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