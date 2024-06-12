// rootSaga.ts
import { all } from 'redux-saga/effects';
import employeeSaga from './saga/employeeSaga';

function* rootSaga() {
    yield all([employeeSaga()]);
}

export default rootSaga;
