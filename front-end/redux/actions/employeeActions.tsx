// actions/employeeActions.ts
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
} from "../actionTypes/employeeActionTypes";

export const fetchEmployeesRequest = () => ({
  type: FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees: any) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesFailure = (error: string) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error,
});
