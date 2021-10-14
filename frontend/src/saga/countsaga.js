import axios from "axios";
import { setDashboardCounts } from "../store/Setcount/Action";
import { call, all, put, takeEvery } from "redux-saga/effects";
import { types } from "../store/constant/constant";

const apiUrl = `http://localhost:3000/api/count`;
function fetchcount() {
  return fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    }); 
}

function* fetchUsers(action) {
  const count = yield call(fetchcount);
  yield put(setDashboardCounts(count));
}

function* userSaga() {
  yield takeEvery(types.GET_DASHBOARD_COUNTS, fetchUsers);
}

function* rootsaga() {
  yield all([userSaga()]);
}

export default rootsaga;
