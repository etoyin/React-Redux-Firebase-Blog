import React, { Component } from 'react';
import { createComments} from '../../store/actions/commentsAction';
import { connect } from 'react-redux';
import { likePost } from '../../store/actions/likeAction'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class PostDetails extends Component {
    state = {
        content: '',
        like: false
    }
    /*componentDidMount(){
        setTimeout(() => {
            console.log(this.props.post);            
            //the setTimeOut delays this.props.likePost function so that the state will be set before it.
            //we need to pass i the id so as to pass it in the likeAction
            this.setState({
                like: this.props.post.likes.includes('myId')
            })
        }, 1000);
        
    }*/
    addLike = () => {
        this.setState({
            like: !this.state.like
        });
        const postId = this.props.match.params.id
        //passing in only the like property of state
        setTimeout(() => {
            //the setTimeOut delays this.props.likePost function so that the state will be set before it.
            //we need to pass i the id so as to pass it in the likeAction
            // this.props.auth.uid is the current user Id which needs to be added to the like array in the likeAction
            console.log(this.props.auth.uid);
            this.props.likePost(this.state.like, postId, this.props.auth.uid)
        }, 1);
    }
    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.content);
        const id = this.props.match.params.id;
        //we need to pass i the id so as to know which post to store the comments in the commentsAction
        //we can get the name of the person commenting from the profile object
        this.props.createComments(this.state.content, id, this.props.currentUserProfile);
    }
    render () {
        const { post, auth } = this.props;
        //console.log(auth.uid);
        if (!auth.uid) return <Redirect to='/signin' />
        if(post){
            return (
                <div className="container section post-details">
                    <div className="card z-depth-0 content">
                        <div className="card-content">
                            <span className="card-title"><bold>{post.title}</bold></span>
                            <p className='flow-text'>{post.content}</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted By {post.author}</div>
                            <div>{post.createdAt.toDate().toString()}</div>
                            
                        </div>
                        <div className="card-action grey lighten-4">
                        <i onClick={this.addLike} class="material-icons">{(this.state.like || post.likes.includes(auth.uid) ? 'favorite' : 'favorite_border')}</i><span className="noOfLikes">{post.likes.length}</span>
                            {
                                post && post.comments.map((comment, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{comment.content}</p>
                                            <p className='grey-text text-darken-5'><em> - {comment.author}</em></p>
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
    //console.log(post);
    return {
        post: post,
        auth: state.firebase.auth,
        currentUserProfile: state.firebase.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createComments: (comment, id, currentUserProfile) => {
            dispatch(createComments(comment, id, currentUserProfile));
        },
        likePost: (like, id, currentUserId) => {
            dispatch(likePost(like, id, currentUserId));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts'}
    ])
)(PostDetails);
