import profilesaga from "../oneuser/profilesaga";
import { all } from "@redux-saga/core/effects";
import userSaga from "../Setcount/countsaga";
import allusers from "../Users/usersSaga";
import registeredUser from "../register/registersaga";

function* allsaga() {
    yield all([
      userSaga() , 
      profilesaga(),
      allusers(),
      registeredUser()
    ]);
  }

export default allsaga;