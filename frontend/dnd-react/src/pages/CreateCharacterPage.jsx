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

    // auth details
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    }
    


    // reset character data to clean any lingering data
    useEffect(() => {
        resetCharacter()
    }, [])

    // load character data if there is a character id
    useEffect(() => {
        if(characterId) {
            axios.get(`${userContext.backendURL}chars/edit/${characterId}/`, config)
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
            const response = await axios.put(`${userContext.backendURL}chars/edit/${characterId}/`, tempCharData, config);

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
            const response = await axios.delete(`${userContext.backendURL}chars/delete/${characterId}`, config)
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
            const response = await axios.post(`${userContext.backendURL}chars/create/`, tempCharData, config)
            
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

    const handlePrint = async () => {
        try {
            const response = await axios.post(`${userContext.backendURL}chars/generate_pdf/`, charData, config)

            if (response.status === 200){
                const blob = new Blob([response.data], {type:'application/pdf'})
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'filled_character_sheet.pdf'
                link.click()
            } else {
                console.log('error generating pdf:', response.data)
            }
        } catch (error) {
            console.error("there was an error generating the PDF:', error")
        }
    }

    //console.log(charData)
    return (
        <>
            <div className='bg-secondary'>
                <div style={{height: "75px"}}></div>
                <div className="container bg-dark border p-3">
                    <div className='bg-secondary'>
                            <CharSheetHeader />
                        <div className="row m-1">
                            <div className='border bg-light p-1'></div>
                            <div className="col-md-12">
                                <CharSheetAttributes />
                            </div>
                            <div className='border bg-light p-1'></div>
                            <div className="col-md-12">
                                <CharSheetSavingHitDice />
                            </div>
                            <div className='border bg-light p-1'></div>
                            <div className="col-md-12">
                                <CharSheetFeatures />
                            </div>
                            <div className='border bg-light p-1'></div>
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
                                        <button
                                            type='button'
                                            className='btn btn-danger ml-2'
                                            onClick={handlePrint}
                                        >Print</button>
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
            
            </div> 
        </>
    );
}

export default CreateCharacterPage;