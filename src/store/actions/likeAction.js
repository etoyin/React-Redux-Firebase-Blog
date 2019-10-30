
export const likePost = (likeStatus, postId, currentUserId) => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.
        console.log(currentUserId);
        //makkes async call to the database.
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('posts').doc(postId).update({
            likes: (likeStatus ? firebase.firestore.FieldValue.arrayUnion(currentUserId) : firebase.firestore.FieldValue.arrayRemove(currentUserId))

            // then fuction is fired only after the returned function is through 
            //with talk in to the database.
        }).then(() => {
            dispatch({type: 'LIKE_POST', like: likeStatus})
        }).catch((err) => {
            dispatch({type: 'LIKE_POST_ERR', err: err})            
        })

    }
}