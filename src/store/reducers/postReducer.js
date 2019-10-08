const initState = {
    posts: [  
        {'id': 1, 'title': 'HeLLo', 'content': 'a thio ghyg dfer nfyjdm '},
        {'id': 2, 'title': 'Worldo', 'content': 'a thio ghyg dfer nfyjdm '},
        {'id': 3, 'title': 'Yeyh!!', 'content': 'a thio ghyg dfer nfyjdm '}
    ]

}

const postReducer = (state = initState, action) => {
    switch (action.type){
        case 'CREATE_POSTS':
            console.log('Created Posts', action.post);
            return state;
        case 'CREATE_POSTS_ERR':
            console.log('Create Posts Error', action.err);
            return state;
        default:
            return state;
    }
}

export default postReducer;
