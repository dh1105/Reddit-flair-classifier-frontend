import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

// eslint-disable-next-line
const loggerMiddleware = createLogger();

var store;

if(process.env.NODE_ENV === 'development'){
    // console.log("Development env");
    store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}
else{
    store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware
        )
    );
}

export {store};