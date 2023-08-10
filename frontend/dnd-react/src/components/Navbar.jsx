import {Link} from 'react-router-dom'
import {useUser} from '../context/UserContext.jsx'


export default function Navbar() {
    const { user } = useUser();

    return (
        <>
            <nav>
                <h1>Navbar</h1>
                
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {!user && <li><Link to='/register'>Register</Link></li>}
                    {!user && <li><Link to='/login'>Login</Link></li>}
                    {user && <li><Link to='/logout'>Logout</Link></li>}
                    {user && <li><Link to='/info'>Info</Link></li>}
                </ul>



                {user ? (
                    <p>Welcome, {user.username}</p>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </>
    )
        

    
}