import { useState } from 'react'
import axios from 'axios'
import {api} from '../utilities.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'


export default function RegisterPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { backendURL } = useUser()

    const {setUser} = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(firstName, lastName)
            const response = await axios.post(`${backendURL}users/register/`, {
                email:email,
                password:password,
                first_name:firstName,
                last_name:lastName
            });
            //setUser(response.data)
            console.log("Registration successful:", response.data);
            //reset form inputs
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            navigate('/')
        } catch (error) {
            console.error("Registration failed:", error)
        }
    }



    return (
        <>
            <div className='img_background'>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='card login_card w-50 border-dark'>
                        <div className='card-header d-flex justify-content-center bg-dark text-white'>
                            <h2>Register</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3 d-flex justify-content-center'>
                                    <input 
                                        type="email" id='emailInput'
                                        className='form-control text-center'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Email...'
                                        required
                                    />
                                </div>
                                <div className='mb-3 d-flex justify-content-center'>
                                    <input 
                                        type="password"
                                        id="passwordInput"
                                        className='form-control text-center'
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder='Password...'
                                    />
                                </div>
                                <div className='mb-3 d-flex justify-content-center'>
                                    <input 
                                        type="text" 
                                        className='form-control text-center'
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='First name...'
                                    />
                                </div>
                                <div className='mb-3 d-flex justify-content-center'>
                                    <input 
                                        type="text" 
                                        className='form-control text-center'
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder='Last name...'
                                    />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className='btn btn-dark'>Register</button>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <Link className='nav-link' to='/login'>Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}