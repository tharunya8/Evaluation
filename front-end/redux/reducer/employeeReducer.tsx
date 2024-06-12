// reducer/employeeReducer.ts
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
} from '../actionTypes/employeeActionTypes';

const initialState = {
  loading: false,
  employees: [],
  error: '',
};

const employeeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: '',
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        employees: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
