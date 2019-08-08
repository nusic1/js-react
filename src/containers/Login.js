import React from 'react';
import { observer } from 'mobx-react';
import { createSession } from '../services/users';
import styles from './Login.module.css';
import { AppContext } from '../state/AppContext';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';

export function LoginComponent(props) {
    const { appState } = React.useContext(AppContext);
    const { register, handleSubmit, errors } = useForm();

    let headers = {
        'Authorization': localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    async function registerSession(data){
        appState.email = data.email;
        let sessionData = {
            session: {
                'email': `${data.email}`,
                'password': `${data.password}`
            }
        };
        await createSession(appState, sessionData, headers);
        props.history.push('/');
    }

    return (
        <form onSubmit={handleSubmit(registerSession)}
            className={styles.wrapper}>
            <div
                className={styles.loginTab}>Login</div>
            <input
                type="text"
                placeholder="Username"
                name="email"
                ref={register({
                    required: 'Username is required!',
                })}>
            </input>
            {errors['username'] && errors['username'].message}
            <input
                type="password"
                placeholder="Password"
                name="password"
                ref={register({
                    required: 'Password is required!',
                    validate: (value) => Boolean(value.length > 3) || 'Use a stronger password'
                })}>
            </input>
            {errors['password'] && errors['password'].message}
            <div
                className={styles.rememberMe}>
                <input
                    type="checkbox"
                    placeholder="checkbox"
                    name="checkbox">
                </input>
                {errors['password'] && errors['password'].message}
                Remember me
            </div>
            <div
                className={styles.button}>
                <button
                    type="submit"
                    className={styles.btn}>
                    Login</button>
            </div>
            <div
                className={styles.noAccount}>
                <h3>Don't have an account?</h3>
            </div>
            <div
                className={styles.registerHere}>
                <Link to={`/register`}><p>Register here</p></Link>
            </div>
        </form>
    );
}

export const Login = observer(LoginComponent);