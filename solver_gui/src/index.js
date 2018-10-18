import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Styles and icons related imports
import './include/bootstrap'
import 'font-awesome/css/font-awesome.min.css'
// ----------------
// Redux related imports
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import functionsReducer from './js/reducer/functions-reducer';
import FunctionS from "./js/entities/FunctionS";
//-----

const reducers = combineReducers({
    functionS:functionsReducer
});


// window.devToolsExtension && window.devToolsExtension()
const storeEnhancers = compose(applyMiddleware(thunk));

const store = createStore(
    reducers, {functionS:new FunctionS({})}, storeEnhancers
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
