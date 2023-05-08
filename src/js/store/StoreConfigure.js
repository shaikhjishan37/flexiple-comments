import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import appReducer from 'js/app/reducers/AppReducer';
import CommentReducer from './../comment/reducers/CommentReducer'

const rootReducer = combineReducers({
    appData: appReducer,
    comments: CommentReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) );

export default store;
