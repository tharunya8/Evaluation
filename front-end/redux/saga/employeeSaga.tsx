// saga/employeeSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosRequestConfig } from 'axios';
import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_FAILURE,
} from '../actionTypes/employeeActionTypes';
import { fetchEmployeesSuccess } from '../actions/employeeActions';

function* fetchEmployees(): Generator<any, void, any> {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AYWFsdWRyYS5jb20iLCJlbXBfaWQiOjEwMDEsImlhdCI6MTcxODE4ODE3MX0.VDhvmfvX0IMCIktI3HCZRX3_3rv_ai92MgCS7gPhw9s', // Replace 'your_token_here' with your actual token
            },
        };
        const response = yield call(axios.post, 'http://localhost:5000/api/employees', {}, config);
        const res = yield response.data

        yield put(fetchEmployeesSuccess(res));
    } catch (error: any) {
        yield put({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
    }
}

function* employeeSaga() {
    yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployees);
}

export default employeeSaga;
