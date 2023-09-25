import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders'

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                const user = user.email;
                alert(`{user} logged out`);
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to="/" className="btn btn-ghost normal-case text-xl">Home</Link>
                        <Link to="/orders" className="btn btn-ghost normal-case text-xl">Orders</Link>
                        <Link to="/practise" className="btn btn-ghost normal-case text-xl">Practise</Link>
                        {
                            user &&
                            <Link to="/profile" className="btn btn-ghost normal-case text-xl">Profile</Link>
                        }
                        


                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl hidden lg:flex">Auth Master</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <Link to="/" className="btn btn-ghost normal-case text-xl">Home</Link>
                <Link to="/orders" className="btn btn-ghost normal-case text-xl">Orders</Link>
                <Link to="/practise" className="btn btn-ghost normal-case text-xl">Practise</Link>
                {
                    user &&
                    <Link to="/profile" className="btn btn-ghost normal-case text-xl">Profile</Link>
                }

            </div>
            <div className="navbar-end">
                {
                    user ? <><span className=" normal-case text-xl">{user.displayName}</span>
                        <Link onClick={handleLogOut} className="btn btn-ghost normal-case text-xl">SignOut</Link>
                    </> : <>
                        <Link to="/register" className="btn btn-ghost normal-case text-xl">Register</Link>
                        <Link to="/login" className="btn btn-ghost normal-case text-xl">LogIn</Link>
                        <Navigate to='/login' replace={true}></Navigate></>
                }
            </div>
        </div>
    )
}

export default Header