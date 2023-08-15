import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function HomePage() {
    const navigate = useNavigate()
    const userContext = useUser()
    const [characters, setCharacters] = useState()

    // if there's no use navigate to login
    useEffect(() => {
        if(!userContext.user) {
            navigate('/login');
        }
    }, [userContext.user, navigate])

    // get users character data
    useEffect(() => {
        if(!userContext.user){
            navigate('/login')
        }else{
            async function fetchCharacters() {
                // get token from local storage, will change later to cookie
                const token = localStorage.getItem('token')
                console.log('my token: ', token)
                
                try {
                    const response = await axios.get(`${userContext.backendURL}chars/characters/`, {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    })
                    if(response.status === 200) {
                        setCharacters(response.data)
                        console.log(response.data)
                    }
                }catch(error){
                    console.error("Error fetching characters:", error)
                }
            }
            fetchCharacters()
        }
    }, [])
    // [userContext.user, navigate]

    // create character button logic
    const handleCreateCharacter = () => {
        navigate('/createCharacter')
    }

    return (
        <>
            <div className='img_background'>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-dark m-4 p-3' onClick={handleCreateCharacter}>
                        Create Character
                    </button>
                </div>

                <div className='container'>
                    <div className="row">
                        {characters && characters.map(character => (
                            <div className="col-md-4 mb-3" key={character.id}>
                                <div className="card">
                                    <div className="card-header">
                                        {character.charName}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{character.userName}</h5>
                                        <p className="card-text">{character.className}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 

            </div>
            
        </>
    )
}