import React, {useState} from 'react';
import './Login.css';
import { login } from './../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login(props) {

    const [userData, setUserData] = useState({});
    const [isLoggedUser, setLoggedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = (event) => {
        event.persist();
        console.log(event);

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value

        }));
        setErrorMessage('');
        console.log(userData);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(userData).then(() => {
            console.log('Login success.');
            setLoggedUser(true);
        })
        .catch((err) => setErrorMessage(err.message));
    };

    return (
        <>
        { isLoggedUser && <Redirect to="/" /> }
        <div className="login-wrapper">
            
            <form className="login-form" onSubmit={onFormSubmit}>
            {errorMessage && <span className="text-danger">{errorMessage}</span>}
                <div className="form-group">
                    <label class="text-white" htmlFor="username">Username</label>
                    <input type="username" name="username" id="username" class="form-control" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label class="text-white" htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control" onChange={onInputChange} />
                </div>
                <button className="btn btn-outline-light btn-success btn-lg mt-2 mb-2">Login</button>
                <Link class="text-white" to="/register">Don't have an account? </Link>
            </form>
        </div>
        </>
    )
}