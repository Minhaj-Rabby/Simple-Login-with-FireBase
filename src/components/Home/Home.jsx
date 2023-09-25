import React, { useContext } from 'react'
import { AuthContext } from '../../Providers/AuthProviders'

const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {
                user &&
                <h2>This Is Home : {user.displayName}</h2>

            }
        </div>
    )
}

export default Home