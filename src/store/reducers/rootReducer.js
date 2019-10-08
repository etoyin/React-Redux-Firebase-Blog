import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentsReducer from './commentsReducer';
import likeReducer from "./likeReducer";
//this reducer is madefor syncing our firestore data with the statein the background.
import { firestoreReducer } from 'redux-firestore'



const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    comment: commentsReducer,
    like: likeReducer,
    firestore: firestoreReducer
})

export default rootReducer;