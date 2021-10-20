import { call, all, put, takeEvery } from "redux-saga/effects";
import { types } from "../constant/constant";
import { register } from "./action";

const apiUrl = `http://localhost:3000/api/register`;
function fetchUsers() {
  return fetch(apiUrl, {
    method: "POST",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    }); 
}

function* userregister(action) {
  const userdata = yield call(fetchUsers);
  yield put(register(userdata));
}

function* registeredUser() {
  yield takeEvery(types.USER_REGISTERED, userregister);
}

export default registeredUser;
