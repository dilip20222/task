import { call, all, put, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import { types } from "../constant/constant";
import { addUsers } from "./AlluserAction";


function fetchprofile({page, rowsPerPage}) {
  return api
    .get(`/pages?page=${page}&limit=${rowsPerPage}`)
    .then(res=>res.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers({data}) {
  const res = yield call(fetchprofile, data);
  yield put(addUsers({users: res.users, info: res.info}));
}

function* allusers() {
  yield takeEvery(types.GET_ALLUSER, fetchUsers);
}

export default allusers;
