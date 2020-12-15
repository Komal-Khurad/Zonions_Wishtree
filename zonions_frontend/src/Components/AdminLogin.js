import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

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

        if (email === '') {
            this.setState({
                emailError: 'Email can not be empty'
            })
            isValid = false
        }
        else if(email!=='' && adminEmail !== email){
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
        if (password === '') {
            this.setState({
                passwordError: 'Password can not be empty'
            })
            isValid = false
        }
        else if(password !=='' && adminPassword !== password){
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
            console.log('login admin token', Cookies.get('token'))

            alert('Admin logged in successfully!');
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
            <div className='container'>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" name='email' value={this.state.email} onChange={this.changeHandler} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        <pre style={{ color: 'red' }}>{this.state.emailError}</pre>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={this.state.password} onChange={this.changeHandler} placeholder="Password" />
                        <pre style={{ color: 'red' }}>{this.state.passwordError}</pre>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default AdminLogin
