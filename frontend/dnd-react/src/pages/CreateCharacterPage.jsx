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
            //user
            id: userContext.user.id,
            // main
            characterName: charContext.characterName,
            background: charContext.background,
            characterClass: charContext.characterClass,
            // playerName: charContext.playerName,
            race: charContext.race,
            alignment: charContext.alignment,
            // attributes
            strValue: charContext.strValue,
            strBonus: charContext.strBonus,
            dexValue: charContext.dexValue,
            dexBonus: charContext.dexBonus,
            conValue: charContext.conValue,
            conBonus: charContext.conBonus,
            intValue: charContext.intValue,
            intBonus: charContext.intBonus,
            wisValue: charContext.wisValue,
            wisBonus: charContext.wisBonus,
            chaValue: charContext.chaValue,
            chaBonus: charContext.chaBonus,
            // skills
            skills: {
                acrobaticsValue: charContext.acrobaticsValue,
                animalHandlingValue: charContext.animalHandlingValue,
                arcanaValue: charContext.arcanaValue,
                athleticsValue: charContext.athleticsValue,
                deceptionValue: charContext.deceptionValue,
                historyValue: charContext.historyValue,
                insightValue: charContext.insightValue,
                intimidationValue: charContext.intimidationValue,
                investigationValue: charContext.investigationValue,
                medicineValue: charContext.medicineValue,
                natureValue: charContext.natureValue,
                perceptionValue: charContext.perceptionValue,
                performanceValue: charContext.performanceValue,
                persuasionValue: charContext.persuasionValue,
                religionValue: charContext.religionValue,
                sleightOfHandValue: charContext.sleightOfHandValue,
                stealthValue: charContext.stealthValue,
                survivalValue: charContext.survivalValue
            }
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