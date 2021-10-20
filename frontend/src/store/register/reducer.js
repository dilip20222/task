import { types } from "../constant/constant";
const defaultstate = { user = null }

function register(state = defaultstate , action)
{
    switch(action.type)
    {
        case types.USER_REGISTER : 
        return {
            ...state,
            Data : action.Data
        }
        case types.USER_REGISTERED : 
        return{
            ...state , 
            formdata : action.formdata
        }
    }
} 