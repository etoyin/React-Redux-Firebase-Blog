
export const signIn = (credentials) => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.

        //makkes async call to the database.
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err: err})            
        })

    }
}


export const signOut = () => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.

        //makkes async call to the database.
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}