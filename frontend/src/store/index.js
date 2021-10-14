import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import profiles from "./oneuser/profilereducer";
import Setcount from "./Setcount/Reducer";
import alluser from "./Users/Reducer";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootsaga from "../saga/countsaga";
import Logout from "@mui/icons-material/Logout";
import userSaga from "../saga/countsaga";
import rootsaga1 from "../saga/profilesaga";

const SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
const Store = configureStore({
  reducer: {
    profiles,
    Setcount,
    alluser,
  },
  middleware
});

SagaMiddleware.run(userSaga , rootsaga1);

export default Store;
