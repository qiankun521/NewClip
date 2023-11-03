export const loginRequest=()=>({
    type:"LOGIN_REQUEST",
})

export const loginSuccess=(username,token,success,user_id)=>({
    type:"LOGIN_SUCCESS",
    username,
    token,
    message:success,
    user_id
})

export const loginFailure=(error)=>({
    type:"LOGIN_FAILURE",
    message:error
})

export const logOut=()=>({
    type:"LOGOUT"
})

export const registerRequest=()=>({
    type:"REGISTER_REQUEST",
})

export const registerSuccess=(success)=>({
    type:"REGISTER_SUCCESS",
    message:success
})  

export const registerFailure=(error)=>({
    type:"REGISTER_FAILURE",
    message:error
})