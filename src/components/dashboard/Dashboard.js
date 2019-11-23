import React, {Component} from 'react';
import Notification from './Notification';
import PostList from '../posts/PostList';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component{
    render(){
        //console.log(this.props);
        const { posts, auth, notifications } = this.props;
        console.log('notifications',notifications);
        if (!auth.uid) return <Redirect to='/signin' />
        return(
            <div className="dashboard container">
                <div className="row">
                    {/** postlist component */}
                    <div className="col s12 m6">
                        <PostList posts={posts}/>
                    </div>
                    {/** notification component */}
                    <div className="col s12 m5 offset-m1">
                        <Notification notifications={notifications} />
                    </div>
                </div>
            </div>        
        )
    }
}
// this maps the state from store to the props of the dashboard.
const mapStateToProps = (state) => {
    console.log(state);
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard);