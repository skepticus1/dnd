import {useState} from 'react'
import {api} from '../utilities.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import axios from 'axios'


export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser, backendURL } = useUser()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendURL}users/login/`, {
                email:email,
                password:password,
            })

            let token = response.data.token
            //console.log(token)
            localStorage.setItem('token', token)
            //console.log(response.data)
            setUser(response.data)
            navigate('/')
        } catch (error) {
            console.error("my error", error)
        }
    }



    return (
        <>
            <div className='img_background'>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='card login_card w-50 border-dark'>
                        <div className='card-header d-flex justify-content-center bg-dark text-white'>
                            <h2>Login Page</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                            <div className='mb-3 d-flex justify-content-center'>
                                <input
                                    type="email"
                                    id='emailInput'
                                    className='form-control text-center'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email...'
                                    required
                                />
                            </div>
                            <div className='mb-3 d-flex justify-content-center'>
                                <input
                                    type="password"
                                    id='passwordInput'
                                    className='form-control text-center'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password...'
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className='btn btn-dark'>Login</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Link className='nav-link' to='/register'>Register</Link>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}