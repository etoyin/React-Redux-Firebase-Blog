import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentsReducer from './commentsReducer';
import likeReducer from "./likeReducer";
//this reducer is made for syncing our firestore data with the state in the background.
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'



const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    comment: commentsReducer,
    like: likeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;