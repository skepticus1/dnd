import CharSheetHeader from '../components/CharSheetHeader.jsx'
import CharSheetPageOneLeft from '../components/CharSheetPageOneLeft.jsx';
import CharSheetPageOneMiddle from '../components/CharSheetPageOneMiddle.jsx'
import CharSheetPageOneRight from '../components/CharSheetPageOneRight.jsx'
import { useCharacter } from '../context/CharContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import axios from 'axios'

const CreateCharacterPage = () => {
    const charContext = useCharacter()
    const userContext = useUser()

    const handleSubmit = async () => {
        const charData = {
            // main
            characterName: charContext.characterName,
            background: charContext.background,
            characterClass: charContext.characterClass,
            playerName: charContext.playerName,
            race: charContext.race,
            alignment: charContext.alignment,
            // attributes
            strValue: charContext.strValue,
            dexValue: charContext.dexValue,
            conValue: charContext.conValue,
            intValue: charContext.intValue,
            wisValue: charContext.wisValue,
            chaValue: charContext.chaValue,
            // skills
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

        try {
            const response = await axios.post(`${userContext.backendURL}chars/create/`, charData)
            
            if(response.status === 201) {
                console.log('Character saved:', response.data)
            } else {
                console.error('Error saving character:', response.data)
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
                <div className="row mb-3">
                    <div className="col-md-4">
                        <div className='border p-1'>
                            <CharSheetPageOneLeft />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='border p-2'>
                            <CharSheetPageOneMiddle />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='border p-2'>
                            <CharSheetPageOneRight />
                        </div>
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