import { configureStore } from "@reduxjs/toolkit";
import profiles from "./oneuser/profilereducer";
import Setcount from "./Setcount/Reducer";
import alluser from "./Users/Reducer";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import allsaga from "./saga";

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

SagaMiddleware.run(allsaga);

export default Store;
