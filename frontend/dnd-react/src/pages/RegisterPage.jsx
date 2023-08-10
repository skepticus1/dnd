import { useState } from 'react'
import axios from 'axios'
import {api} from '../utilities.jsx'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'


export default function RegisterPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const {setUser} = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(firstName, lastName)
            const response = await api.post('/users/register/', {
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
            <h2>Register Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    )
}