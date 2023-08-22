import {Link} from 'react-router-dom'
import {useUser} from '../context/UserContext.jsx'
import {useCharacter} from '../context/CharContext.jsx'
import { useEffect } from 'react';


export default function Navbar() {
    const { user } = useUser();
    const { charData } = useCharacter();

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar_padding'>
                <Link className='navbar-brand' to='/'>DnD</Link>
                
                <button className='navbar-toggler' type='button' data-toggle='collapse'
                    data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false'
                    aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                <div className='collapse navbar-collapse' id='navbarContent'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        {!user && <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>}
                        {!user && <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>}
                        {user && <li className='nav-item'><Link className='nav-link' to='/logout'>Logout</Link></li>}
                        {user && <li className='nav-item'><Link className='nav-link' to='/info'>Info</Link></li>}
                    </ul>
                </div>
                <div>
                    <span className='navbar-text m-2'>
                        {charData.charName && `Selected Character: ${charData.charName}`}
                        
                    </span>
                </div>
                <span className='navbar-text'>
                    {user && `Welcome, ${user.username}`}
                </span>
            </nav>
        </>
    )
        

    
}