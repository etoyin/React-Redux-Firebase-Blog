import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
//thunk is middleware that halts dispatch action, performs async req and then resumes dispatch
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore} from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';



const store = createStore(rootReducer, 
    compose(
        //these are the store enhancers!!!
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        //pass our config file to connect to the config
        reduxFirestore(fbConfig),
        //attachauthisready will allow us to access a method called firebaseAuthIsReady
        //useFirestoreForProfile: true, userProfile: 'users', allows us to sync firebase profile to firestore users
        reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true })
    )
);

//firebaseAuthIsReady waits for our app to check for authentication and then calls a callback function that renders our page
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();

})

