import CharSheetHeader from '../components/CharSheetHeader.jsx'
import CharSheetAttributes from '../components/CharSheetAttributes.jsx'
import { useCharacter } from '../context/CharContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import CharSheetSavingHitDice from '../components/CharSheetSavingHitDice.jsx';

const CreateCharacterPage = () => {
    const navigate = useNavigate()
    const charContext = useCharacter()
    const userContext = useUser()


    const handleSubmit = async () => {
        
        const charData = {
            id: userContext.user.id,
            ...charContext.charData
        }


        try {
            const response = await axios.post(`${userContext.backendURL}chars/create/`, charData)
            
            if(response.status === 201) {
                console.log('Character saved:', response.data)
                charContext.resetCharacter()
                navigate('/')
            } else {
                console.error('Error saving character:', response.data)
                // add error page navigation here
            }
        } catch (error) {
            console.error('There was an error saving the character:', error)
        }

    }

    return (
        <div className="container mt-5">
            <div className='border p-3'>
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
                    <div className="col-md-4">

                    </div>
                </div>
                {/* Submit Button */}
                <div className="row mt-3">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default CreateCharacterPage;