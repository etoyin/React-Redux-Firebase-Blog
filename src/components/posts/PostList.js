import React from 'react';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
    return(
        <div className="post-list section">
            {/** If posts are available, then map through it, else dont. */}
            {posts && posts.map((post) => {
                return (
                    <Link to={'/post/' + post.id} key={post.id}>
                        <PostSummary post={post} />
                    </Link>
                )
            })}
        </div>
    )
}

export default PostList;