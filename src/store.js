import { createStore, applyMiddleware, compose } from "redux";
import todoReducers from "./Reducers/todoReducers";
import thunk from "redux-thunk";

// detect whether the browser has redux extension installed
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the redux store for react to use
const store = createStore(
    todoReducers,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
