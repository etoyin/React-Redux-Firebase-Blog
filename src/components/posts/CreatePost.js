import React, { Component } from 'react'
import { createPosts } from '../../store/actions/postAction'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class CreatePost extends Component {
    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createPosts(this.state, this.props.currentUserProfile);
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
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
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