import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders'
import { sendEmailVerification, updateProfile } from 'firebase/auth';

const Register = () => {

    const [error, setError] = useState('');
    const { user, emptyUser, createUser, checkPassword } = useContext(AuthContext);


    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!checkPassword(password)) {

            setError("Password Must Contain a Uppercase, a Lowercase , a Special character, a Digit   and 8 Character.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                handleNameSave(loggedUser, name);
                handleEmailVerification(loggedUser);
                alert('User created Sucessfully, Please Verify Email');
                setError('');
                if(!loggedUser.emailVerified){
                    emptyUser();
                    setError('');

                }
            }).catch(error => {
                console.error(error);
            })

    }

    const handleEmailVerification = (user) => {
        sendEmailVerification(user)
            .then(() => {
            });
    }

    const handleNameSave = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('User Name Updated');
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-2">Please Register !</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-4">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div className=" text-center label-text">
                            <p className='text-error mt-2 mb-2'>{error}</p>
                            <Link to='/login' className="label-text-alt link link-hover">Already Have an Account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register