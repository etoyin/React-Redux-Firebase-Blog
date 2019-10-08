const initState = {
    comments: [  
        {'id': 1, 'content': 'a thio ghyg dfer nfyjdm '},
        {'id': 2, 'content': 'a thio ghyg dfer nfyjdm '},
        {'id': 3, 'content': 'a thio ghyg dfer nfyjdm '}
    ]

}

const commentsReducer = (state = initState, action) => {
    switch (action.type){
        case 'CREATE_COMMENTS':
            console.log('Created', action.comment);
            return state;
        case 'CREATE_COMMENTS_ERR':
            console.log('Create Posts Error', action.err);
            return state;
        default:
            return state;
    }
}

export default commentsReducer;
