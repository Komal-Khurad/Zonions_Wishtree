import React, { Component } from 'react'
import Cookies from 'js-cookie';
import '../../src/login.css'

class AdminLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            adminEmail: 'komalkhurad@gmail.com',
            adminPassword: 'Komal@123'
        }
    }

    validateInput = () => {
        const { email, password, adminEmail, adminPassword } = this.state;
        var isValid = true;

        if(email!=='' && adminEmail !== email){
            this.setState({
                emailError: 'Email did not matched'
            })
            isValid = false
        }
        else {
            this.setState({
                emailError: ''
            })
            isValid = true
        }
        if(password !=='' && adminPassword !== password){
            this.setState({
                passwordError: 'Password did not match'
            })
            isValid = false
        } 
        else {
            this.setState({
                passwordError: ''
            })
            isValid = true
        }
        return isValid;
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const isValidForm = this.validateInput();

        if (isValidForm) {

            const random = Math.random();
            const authToken = '$secret' + random;

            Cookies.set('token', authToken);
            this.props.history.push('/restaurant/manage');
        }
    }
    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name='email'placeholder="Username" value={this.state.email} onChange={this.changeHandler} required/>
                    <input type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.changeHandler} required />
                    {
                        this.state.passwordError !== '' ? <pre style={{ color: 'red' }}>{this.state.passwordError}</pre>: null
                    }
                    <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
                </form>
            </div>
        )
    }
}

export default AdminLogin
