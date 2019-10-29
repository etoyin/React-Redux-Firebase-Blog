const initState = {
    authErr: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('Login Failed');
            return{
                ...state,
                authErr: 'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login Passed');
            return{
                ...state,
                authErr: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout Success');
            return state
        default:
            return state
    }
}

export default authReducer;