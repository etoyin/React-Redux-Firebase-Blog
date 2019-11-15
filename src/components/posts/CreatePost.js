import React, { Component } from 'react'
import { createPosts } from '../../store/actions/postAction'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class CreatePost extends Component {
    state = {
        title: '',
        content: '',
        postErrors: { title: '', content: ''},
        titleValid: false,
        contentValid: false,
        postFormValid: false

    }
    handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value
        this.setState({
            [id] : value
        }, () => {
            this.validateInput(id, value);
        })
    }
    validateInput = (fieldName, value) => {
        let titleValid = this.state.titleValid;
        let contentValid = this.state.contentValid;
        let postErrors = this.state.postErrors;

        switch(fieldName){
            case 'title':
                titleValid = value.length > 2;
                postErrors.title = titleValid ? '' : 'The Post title must be more than 2 characters';
                break;
            case 'content':
                contentValid = value.length >= 20;
                postErrors.content = contentValid ? '' : 'The Post content must be more or equal to 20 characters';
                break;
            default:
                break;
        }
        this.setState({
            titleValid: titleValid,
            contentValid: contentValid,
            postErrors: postErrors
        }, this.validatePost)
    }
    validatePost = () => {
        this.setState({
            postFormValid: this.state.titleValid && this.state.contentValid
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createPosts(this.state, this.props.currentUserProfile);
        this.props.history.push('/');
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Post</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Post Content</label>
                        <textarea id="content" cols="30" rows="10" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" disabled={!this.state.postFormValid}>Create</button>
                    </div>
                    <div className='center red-text'>
                        <PostFormErrors postErrors={this.state.postErrors} />
                    </div>
                </form>
            </div>
        )
    }
}

const PostFormErrors = ({postErrors}) => {
    return (
        <div>
            {
                Object.keys(postErrors).map((fieldName, i) => {
                    if(postErrors[fieldName].length > 0){
                        return <p key={i}>{postErrors[fieldName]}</p>
                    }
                })
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPosts: (post, currentUserProfile) => {
            dispatch(createPosts(post, currentUserProfile))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        currentUserProfile: state.firebase.profile
    }
}

//mapStateToProps is the first parameter of connect but we are not getting any state here
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
