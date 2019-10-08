import React, { Component } from 'react';
import { createComments} from '../../store/actions/commentsAction'
import { connect } from 'react-redux';
import { likePost } from '../../store/actions/likeAction'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'

class PostDetails extends Component {
    state = {
        content: '',
        like: false
    }
    addLike = () => {
        this.setState({
            like: !this.state.like
        });
        const id = this.props.match.params.id
        //passing in only the like property of state
        setTimeout(() => {
            //the setTimeOut delays this.props.likePost function so that the state will be set before it.
            //we need to pass i the id so as to pass it in the likeAction
            this.props.likePost(this.state.like, id)
        }, 1);
    }
    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.content);
        const id = this.props.match.params.id;
        //we need to pass i the id so as to pass it in the commentsAction
        this.props.createComments(this.state.content, id);
    }
    render () {
        const { post } = this.props;
        console.log(post);
        if(post){
            return (
                <div className="container section post-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{post.title}</span>
                            <p>{post.content}</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted By {post.author}</div>
                            <div>16th August, 12:12pm</div>
                            
                        </div>
                        <div className="card-action grey lighten-4">
                        <i onClick={this.addLike} class="material-icons">{(this.state.like ? 'favorite' : 'favorite_border')}</i><span className="noOfLikes">{post.likes.length}</span>
                            {
                                post && post.comments.map((comment, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{comment.content}</p>
                                            <p>{comment.author}</p>
                                        </div>
                                    )
                                })
                            }
                            <form onSubmit={this.handleSubmit}>
                                <label>Comments</label>
                                <textarea id="comments" cols="30" rows="10" className="materialize-textarea" onChange={this.handleChange}></textarea>
                                <button className="btn">Add Comments</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="container center card-content">
                    <p>Loading .......</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, thisProps) => {
    const id = thisProps.match.params.id;  
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;
    return {
        post: post
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createComments: (comment, id) => {
            dispatch(createComments(comment, id));
        },
        likePost: (like, id) => {
            dispatch(likePost(like, id));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts'}
    ])
)(PostDetails);
