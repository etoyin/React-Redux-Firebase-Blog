
export const likePost = (like, postId) => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.

        //makkes async call to the database.
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('posts').doc(postId).update({
            likes: (like ? firebase.firestore.FieldValue.arrayUnion('myId') : firebase.firestore.FieldValue.arrayRemove('myId'))

            // then fuction is fired only after the returned function is through 
            //with talk in to the database.
        }).then(() => {
            dispatch({type: 'LIKE_POST', like: like})
        }).catch((err) => {
            dispatch({type: 'LIKE_POST_ERR', err: err})            
        })

    }
}