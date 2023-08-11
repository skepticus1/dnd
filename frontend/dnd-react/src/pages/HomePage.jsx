import { useEffect } from 'react'
import { useUser } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    const { user } = useUser()

    // if there's no use navigate to login
    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user, navigate])

    // create character button logic
    const handleCreateCharacter = () => {
        navigate('/createCharacter')
    }

    return (
        <>
            <div className='img_background'>
                <h2>Home Page</h2>
                <button className='create_character_button' onClick={handleCreateCharacter}>
                    Create Character
                </button>
            </div>
            
        </>
    )
}