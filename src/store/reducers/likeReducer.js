const initState = {
    like: false
}

const likeReducer = (state = initState, action) => {
    switch (action.type){
        case 'LIKE_POST':
            console.log('Created like', action.like);
            return state;
        case 'LIKE_POST_ERR':
            console.log('Create like Error', action.err);
            return state;
        default:
            return state;
    }
}

export default likeReducer;
