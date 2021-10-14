import {configureStore} from '@reduxjs/toolkit'
import profiles from './oneuser/profilereducer';
import Setcount from './Setcount/Reducer';
import alluser from './Users/Reducer';

const Store = configureStore({
    reducer : {
       profiles,
       Setcount ,
       alluser,
    }, 
    middleware: (getMiddleware) => getMiddleware(),
});

export default Store;