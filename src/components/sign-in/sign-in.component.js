import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email, password } = this.state; 

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        }catch(error){
            console.log(error);
        }

        this.setState({email: '', password: ''});
    }

    handleChange = (event) => {
         const { value, name } = event.target;
         this.setState({ [name]: value});
    }

    render(){

        return (
            <div className='sign-in'>
                <div className="title">
                    <h2>I already have an account</h2>
                    <span>Sign In with your email and password</span>
                </div>

                <form onSubmit={this.handleSubmit} >
                    <FormInput name="email" onChange={this.handleChange} label="email" value={this.state.email} required/>
                    <FormInput name="password"  onChange={this.handleChange} label="password" value={this.state.password} required/>
                    <div className="buttons"> 
                        <CustomButton type="submit" >SIGN IN</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>

        );

    }
}

export default SignIn;