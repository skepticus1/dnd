import {useState} from 'react'
import {api} from '../utilities.jsx'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'


export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('users/login/', {
                email:email,
                password:password,
            })

            let token = response.data.token
            localStorage.setItem('token', token)
            console.log(response.data)
            setUser(response.data)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            </form>
        </>
    )
}