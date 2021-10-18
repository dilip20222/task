import profilesaga from "../oneuser/profilesaga";
import { all } from "@redux-saga/core/effects";
import userSaga from "../Setcount/countsaga";
import allusers from "../Users/usersSaga";

function* allsaga() {
    yield all([
      userSaga() , 
      profilesaga(),
      allusers()
    ]);
  }

export default allsaga;