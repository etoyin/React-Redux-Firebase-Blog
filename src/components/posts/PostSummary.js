import React from 'react';

const PostSummary = ({post}) => {
    return(
        <div className="card z-depth-0 post-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{post.title}</span>
                <p>Posted By {post.author}</p>
                <p className="grey-text">15th August, 11:15pm</p>
            </div>
        </div>
    )
}

export default PostSummary;