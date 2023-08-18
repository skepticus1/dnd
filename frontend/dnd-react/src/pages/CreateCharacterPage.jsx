import CharSheetHeader from '../components/CharSheetHeader.jsx'
import CharSheetAttributes from '../components/CharSheetAttributes.jsx'
import CharSheetSavingHitDice from '../components/CharSheetSavingHitDice.jsx';
import CharSheetFeatures from '../components/CharSheetFeatures.jsx'
import CharSheetEquipmentSpells from '../components/CharSheetEquipmentSpells.jsx';
import { useCharacter } from '../context/CharContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'

const CreateCharacterPage = () => {
    const navigate = useNavigate()
    const {charData, setCharData, resetCharacter} = useCharacter()
    const userContext = useUser()
    const { characterId } = useParams()

    useEffect(() => {
        if(characterId) {
            axios.get(`${userContext.backendURL}chars/edit/${characterId}/`)
                .then(response => {
                    const data = response.data
                    setCharData(data)
                })
                .catch(error=> {
                    console.error("error fetching character data:", error)
                })
        }
    }, [] )

    const handleSave = async () => {
        const tempCharData = {
            user_id: userContext.user.id,
            ...charData
        }
        console.log('chardata handleSave: ', tempCharData)
        try{
            const response = await axios.put(`${userContext.backendURL}chars/edit/${characterId}/`, tempCharData);

            if(response.status === 200) {
                console.log("Character updated: ", response.data)
                resetCharacter()
                navigate('/')
            }else {
                console.error('error updating character:' , response.data)
            }
        } catch (error) {
            console.error('there was an error updating the character:', error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${userContext.backendURL}chars/delete/${characterId}`)
            if(response.status === 204) {
                console.log("Character Deleted")
                navigate('/')
            } else {
                console.error('error deleting character: ', response.data)
            }
        } catch (error) {
            console.error('there was an error deleting the character: ', error)
        }
    }

    const handleSubmit = async () => {
        const tempCharData = {
            user_id: userContext.user.id,
            ...charData
        }
        console.log('chardata handlesubmnit: ', tempCharData)
        try {
            const response = await axios.post(`${userContext.backendURL}chars/create/`, tempCharData)
            
            if(response.status === 201) {
                console.log('Character saved:', response.data)
                resetCharacter()
                navigate('/')
            } else {
                console.error('Error saving character:', response.data)
                // add error page navigation here
            }
        } catch (error) {
            console.error('There was an error saving the character:', error)
        }
    }

    console.log(charData)
    return (
        <div className="container mt-5">
            <div className=''>
                {/* Header Information */}
                <CharSheetHeader />
                {/* Main Stats Section */}
                <div className="row m-1">
                    <div className="col-md-12">
                        <CharSheetAttributes />
                    </div>
                    <div className="col-md-12">
                        <CharSheetSavingHitDice />
                    </div>
                    <div className="col-md-12">
                        <CharSheetFeatures />
                    </div>
                    <div className='col-md-12'>
                        <CharSheetEquipmentSpells />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="row mt-3">
                    <div className="col-md-12">
                        {characterId ? (
                            <>
                                <button 
                                    type='submit'
                                    className='btn btn-dark'
                                    onClick={handleSave}
                                >Save</button>
                                <button
                                    type='button'
                                    className='btn btn-danger ml-2'
                                    onClick={handleDelete}
                                >Delete</button>
                            </>
                        ) : (
                            <button 
                                type='submit'
                                className='btn btn-dark'
                                onClick={handleSubmit}
                            >Submit</button>
                        )}
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default CreateCharacterPage;