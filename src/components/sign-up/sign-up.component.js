
import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '' 
        }
    }

    handleSubmit = async event => {
        const {signUpStart} = this.props;
        event.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;

        if(password != confirmPassword){
            alert("Password doesn't match");
            return;
        }

        signUpStart(displayName, email, password, confirmPassword);
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        // console.log('jaja');
    }

    render(){

        const { displayName, email, password, confirmPassword} = this.state;
        // console.log('jeje');

        return(
            <div className="sign-up">
                <h2 className='title'>I do not have and account</h2>
                <span>Sign up with yout email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        label='Display Name'
                        value={displayName}
                        onChange={this.handleChange}
                        required />
                    <FormInput 
                        type='text'
                        name='email'
                        label='Email'
                        value={email}
                        onChange={this.handleChange} />
                    <FormInput 
                        type='text'
                        name='password'
                        label='Password'
                        value={password}
                        onChange={this.handleChange} />
                    <FormInput 
                        type='text'
                        name='confirmPassword'
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={this.handleChange} />
                    <CustomButton type='submit'> SING UP </CustomButton>
                </form>
            </div>
        );
    }


}

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (displayName,email,password,confirmPassword) => dispatch(signUpStart({displayName, email, password, confirmPassword}))
})

export default connect(null, mapDispatchToProps)(SignUp);