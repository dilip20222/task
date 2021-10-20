import { types } from "../constant/constant";

export function register(data)
{
    return{
        type : types.USER_REGISTER,
        data
    }
}

export function registereduser(formdata)
{
    return {
        type : types.USER_REGISTERED,
        formdata
    }
}