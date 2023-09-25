import React, { useContext, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders';
import github_logo from '../../assets/image/github.png';
import google_logo from '../../assets/image/google.png';
import twitter_logo from '../../assets/image/twitter.png';

const LogIn = () => {

    const { checkPassword, emptyUser, user, login, logOut, resetPassword, googlLogIn, githubLogIn, twitterLogIn} = useContext(AuthContext);
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

    const handleGoogleSignIn=()=>{
        googlLogIn()
        .then(result => {
            const loggedUser = result.user;
            //setUser(loggedUser);
            alert('User created Sucessfully');
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }
    const handleGithubSignIn=()=>{
        githubLogIn()
        .then(result => {
            const loggedUser = result.user;
            //setUser(loggedUser);
            alert('User created Sucessfully');
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }
    const handleTwitterSignIn=()=>{
        twitterLogIn()
        .then(result => {
            const loggedUser = result.user;
            //setUser(loggedUser);
            alert('User created Sucessfully');
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
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
                                <Link onClick={handleResetPassword} className="label-text-alt mt-2 link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        <div className="flex flex-col w-full mt-2">
                            <div className="grid rounded-box place-items-center btn btn-outline">
                                <button onClick={handleGoogleSignIn} className="flex flex-grow place-items-center ">
                                    <img className="flex mr-4  w-6 " src={google_logo} alt="Google Logo" /> Continue with Google
                                </button>
                            </div>
                            <div className="divider">OR</div>
                            <div className="flex w-full">
                                <div className="grid  flex-grow  rounded-box place-items-center  btn btn-outline">
                                    <button onClick={handleGithubSignIn} className="flex flex-grow place-items-center ">
                                        <img className="flex mr-4  w-6 " src={github_logo} alt="GitHub Logo" /> <p>GitHub</p>
                                    </button>
                                </div>
                                <div className="divider divider-horizontal">OR</div>
                                <div className="grid  flex-grow  rounded-box place-items-center  btn btn-outline">
                                    <button onClick={handleTwitterSignIn} className="flex flex-grow place-items-center ">
                                        <img className="flex mr-4  w-6 " src={twitter_logo} alt="Twitter Logo" /> Twitter
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" text-center label-text">
                            <p className='text-error mt-2'>{error}</p>
                            <Link to='/register' className="label-text-alt link link-hover">New to AuthMaster?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn