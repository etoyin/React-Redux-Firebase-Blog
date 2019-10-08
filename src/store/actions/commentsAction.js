
export const createComments = (comment, postId) => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.

        //makkes async call to the database.
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('posts').doc(postId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                content: comment,
                author: 'Jasmine',
                createdAt: new Date()})

            // then fuction is fired only after the returned function is through 
            //with talk in to the database.
        }).then(() => {
            dispatch({type: 'CREATE_COMMENTS', comment: comment})
        }).catch((err) => {
            dispatch({type: 'CREATE_COMMENTS_ERR', err: err})            
        })

    }
}