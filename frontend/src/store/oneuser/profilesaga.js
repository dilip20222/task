import { call, all, put, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import { types } from "../constant/constant";
import { addprofile } from "./profileAction"; 

function fetchprofile() {
  // baseURL + /userprofile
  console.log("API CALL")
  return api
    .get("/userprofile")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers(action) {
  const user = yield call(fetchprofile);
  yield put(addprofile(user));
}

function* profilesaga() {
  yield takeEvery(types.GET_PROFILE, fetchUsers);
}

export default profilesaga;
