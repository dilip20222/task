import profiles from "../store/oneuser/profilereducer";
import { types } from "../store/constant/constant";
import { call, put, takeEvery, all} from "@redux-saga/core/effects";
import { addprofile } from "../store/oneuser/profileAction";

const apiurl = 'http://localhost:3000/api/'
const token = localStorage.getItem('token')
function getprofile()
{
    return fetch(apiurl,  
        {
            headers: {
                'Content-Type': 'application/json',
      
            },
            method : 'GET',
        })
        .then((res)=>{res.json()}).catch((error)=>{throw error})
}

function* fetchprofile(action)
{
    const profile = yield call(getprofile);
    yield put(addprofile(profile));
}

function* userprofile()
{
    yield takeEvery(types.GET_PROFILE  , fetchprofile)
}


function* rootsaga1()
{
    yield all([userprofile()])
} 

export default rootsaga1;