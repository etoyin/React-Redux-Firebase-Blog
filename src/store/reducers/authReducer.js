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
        case 'SIGNUP_SUCCESS':
            console.log('Signed Up Success');
            return{
                ...state,
                authErr: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup failed');
            return{
                ...state,
                authErr: action.err.message
            }
        default:
            return state
    }
}

export default authReducer;