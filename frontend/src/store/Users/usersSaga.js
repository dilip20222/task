import { call, all, put, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import { types } from "../constant/constant";
import { users } from "./AlluserAction";


function fetchprofile() {
  // baseURL + /userprofile
  console.log("API CALL")
  return api
    .get("/getuser")
    .then(res=>res.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers(action) {
  const user = yield call(fetchprofile);
  console.log({user});
  yield put(users(user));
}

function* allusers() {
  yield takeEvery(types.GET_ALLUSER, fetchUsers);
}

export default allusers;
