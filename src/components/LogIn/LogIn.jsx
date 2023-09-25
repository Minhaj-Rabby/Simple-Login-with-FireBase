import React, { useContext, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders';

const LogIn = () => {

    const { checkPassword, emptyUser, user, login, logOut, resetPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const emailRef = useRef();



    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        if (!checkPassword(password)) {
            setError("Password Must Contain a Uppercase, a Lowercase , a Special character, a Digit   and 8 Character.");
            return;
        }

        login(email, password)
            .then(result => {
                const loggedUser = result.user;
                if (loggedUser.emailVerified) {
                    console.log(loggedUser);
                    form.reset();
                    alert('User Login Sucessfully');
                    setError('');
                    console.log(loggedUser);
                }
                else {
                    logOut();
                    emptyUser();
                    alert('Verify Your email');
                    setError('');
                }

            }
            ).catch(error => {
                setError(`${error.message}`);
            })

    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please write email');
        }
        resetPassword(email)
            .then(() => {
                alert('Please Check your Email');
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-2">Please Login !</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link onClick={handleResetPassword} className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className=" text-center label-text">
                            <p className='text-error mt-2 mb-2'>{error}</p>
                            <Link to='/register' className="label-text-alt link link-hover">New to AuthMaster?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn