import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import attendanceReducer from './reducers/attendanceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  attendance: attendanceReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
