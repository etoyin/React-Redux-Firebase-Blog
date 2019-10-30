export const createPosts = (post, currentUserProfile) => {
    // because we've passed our configuration into the store enhancers at index.js,
    //getFirebase and getFirestore know what to connect to.

        //makkes async call to the database.
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            comments:[],
            likes: [],
            author: currentUserProfile.firstName + ' ' + currentUserProfile.lastName,
            createdAt: new Date()
            // then fuction is fired only after the returned function is through 
            //with talk in to the database.
        }).then(() => {
            dispatch({type: 'CREATE_POSTS', post: post})
        }).catch((err) => {
            dispatch({type: 'CREATE_POSTS_ERR', err: err})            
        })

    }
}