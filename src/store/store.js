import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'saga/rootSaga';
import {logger} from 'redux-logger';


const sagaMiddleWare = createSagaMiddleware();
const middleWare=[sagaMiddleWare];
if(process.env.REACT_APP_ENV  !== 'production'){
  middleWare.push(logger);
}
export const store =configureStore({
  reducer:rootReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }).concat(middleWare),
})

sagaMiddleWare.run(rootSaga);

