import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useCharacter } from '../context/CharContext.jsx'

export default function HomePage() {
    const navigate = useNavigate()
    const userContext = useUser()
    const charContext = useCharacter()
    const [characters, setCharacters] = useState()

    // if there's no use navigate to login
    useEffect(() => {
        if(!userContext.user) {
            navigate('/login');
        }
    }, [userContext.user, navigate])

    // user is on home page clear charData
    useEffect(() => {
        charContext.resetCharacter()
    }, [])

    // get users character data
    useEffect(() => {
        if(!userContext.user){
            navigate('/login')
        }else{
            async function fetchCharacters() {
                // get token from local storage, will change later to cookie
                const token = localStorage.getItem('token')
                //console.log('my token: ', token)
                
                try {
                    const response = await axios.get(`${userContext.backendURL}chars/characters/`, {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    })
                    if(response.status === 200) {
                        setCharacters(response.data)
                        //console.log(response.data)
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
        charContext.resetCharacter()
        navigate('/createCharacter')
    }

    return (
        <>
            <div className='img_background'>
                <div style={{height: "75px"}}></div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-dark m-4 p-3' onClick={handleCreateCharacter}>
                        Create Character
                    </button>
                </div>

                <div className='container'>
                    <div className="row">
                        {characters && characters.map(character => (
                            <div className="col-md-4 mb-3" key={character.id}>
                                <Link to={`/editCharacter/${character.id}`}>
                                    <div className="card bg-secondary text-white">
                                        <div className="card-header bg-dark">
                                            {character.charName}
                                        </div>
                                        <img
                                            src={`data:image/png;base64,${character.image_data}`}
                                            alt="Character Portrait"
                                            className='card-img-top'
                                            style={{maxHeight: "200px", objectFit: "contain"}}
                                        />
                                        <div className="card-body">
                                            <h5 className='card-title bg-dark text-center'>{character.charName}</h5>
                                            <p className='card-text'>
                                                <strong>Class:</strong> {character.charClass}<br />
                                                <strong>Level:</strong> {character.level}<br />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div> 

            </div>
            
        </>
    )
}