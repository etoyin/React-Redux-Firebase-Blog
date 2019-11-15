import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authAction';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        confirm_password: '',
        firstName: '',
        lastName: '',
        formErrors: {firstName: '', lastName: '', email: '', password: '', confirm_password: ''},
        fNameValid: false,
        lNameValid: false,
        emailValid: false,
        passwordValid: false,
        passwordMatch: false,
        formValid: false
    }
    handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({
            [id] : value
        }, () => {
            this.validateInput(id, value)
        })
        console.log(this.state.fNameValid);
        console.log(this.state.lNameValid);
        console.log(this.state.emailValid);
        console.log(this.state.passwordValid);
        console.log(this.state.passwordMatch);
    }
    validateInput = (fieldName, value) => {
        let formErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let passwordMatch = this.state.passwordMatch;
        let fNameValid = this.state.fNameValid;
        let lNameValid = this.state.lNameValid;

        switch(fieldName){
            case 'firstName':
                fNameValid = value.length > 2;
                formErrors.firstName = fNameValid ? '' : 'First Name must be more than 2 characters';
                break;
            case 'lastName':
                lNameValid = value.length > 2;
                formErrors.firstName = lNameValid ? '' : 'Last Name must be more than 2 characters';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                formErrors.email = emailValid ? '' : 'email is invalid';
                break;
            case 'password': 
                passwordValid = value.length >= 6;
                formErrors.password = passwordValid ? '' : 'password must be 6 or more characters';
                break;
            case 'confirm_password':
                passwordMatch = value === this.state.password;
                formErrors.confirm_password = passwordMatch ? '' : 'confirm password must match password';
                break;
            default:
                break;
        }
        this.setState({
            fNameValid: fNameValid,
            lNameValid: lNameValid,
            formErrors: formErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordMatch: passwordMatch
        }, this.validateForm)
    }
    validateForm = () => {
        this.setState({formValid: 
            this.state.fNameValid && 
            this.state.lNameValid && 
            this.state.emailValid && 
            this.state.passwordValid && 
            this.state.passwordMatch});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }
    render() {
        const { auth, authErr } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" className='validate' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" className='validate' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className='validate' onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input className='validate' type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" disabled={!this.state.formValid}>SignUp</button>
                    </div>
                    <div className='center red-text'>
                        {
                            authErr ? <p>{authErr}</p> : null
                        }
                    </div>
                    <div className='center red-text'>
                        <FormErrors formErrors={this.state.formErrors} />                    
                    </div>
                </form>
            </div>
        )
    }
}

const FormErrors = ({formErrors}) => {
    return(
        <div className='formErrors'>
            {
                Object.keys(formErrors).map((fieldName, i) => {
                    if(formErrors[fieldName].length > 0){
                        return (
                            <p key={i}>{formErrors[fieldName]}</p>
                        )
                    }
                })
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authErr: state.auth.authErr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => {
            dispatch(signUp(newUser))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
