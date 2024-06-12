// rootReducer.ts
import { combineReducers } from 'redux';
import employeeReducer from './reducer/employeeReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
});

export default rootReducer;