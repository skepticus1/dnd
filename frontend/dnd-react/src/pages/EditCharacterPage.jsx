import { useEffect } from "react";
import { useCharacter } from "../context/CharContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import CharSheetHeader from "../components/CharSheetHeader";

const EditCharacterPage = () => {
    const { characterId } = useParams();
    const charContext = useCharacter()
    const userContext = useUser()
    
    useEffect(() => {
        // api call to fetch character data
        axios.get(`${userContext.backendURL}chars/edit/${characterId}/`)
            .then(response => {
                const data = response.data
                console.log(response.data)

                charContext.setCharacterName(data.charName);
                charContext.setBackground(data.background);
                charContext.setCharacterClass(data.char_class);
                charContext.setPlayerName(data.playerName);
                charContext.setRace(data.race);
                charContext.setAlignment(data.alignment);
                charContext.setStrValue(data.strValue);
                charContext.setStrBonus(data.strBonus);
                charContext.setDexValue(data.dexValue);
                charContext.setDexBonus(data.dexBonus);
                charContext.setConValue(data.conValue);
                charContext.setConBonus(data.conBonus);
                charContext.setIntValue(data.intValue);
                charContext.setIntBonus(data.intBonus);
                charContext.setWisValue(data.wisValue);
                charContext.setWisBonus(data.wisBonus);
                charContext.setChaValue(data.chaValue);
                charContext.setChaBonus(data.chaBonus);
                charContext.setAcrobaticsValue(data.acrobaticsValue);
                charContext.setAnimalHandlingValue(data.animalHandlingValue);
                charContext.setArcanaValue(data.arcanaValue);
                charContext.setAthleticsValue(data.athleticsValue);
                charContext.setDeceptionValue(data.deceptionValue);
                charContext.setHistoryValue(data.historyValue);
                charContext.setInsightValue(data.insightValue);
                charContext.setIntimidationValue(data.intimidationValue);
                charContext.setInvestigationValue(data.investigationValue);
                charContext.setMedicineValue(data.medicineValue);
                charContext.setNatureValue(data.natureValue);
                charContext.setPerceptionValue(data.perceptionValue);
                charContext.setPerformanceValue(data.performanceValue);
                charContext.setPersuasionValue(data.persuasionValue);
                charContext.setReligionValue(data.religionValue);
                charContext.setSleightOfHandValue(data.sleightOfHandValue);
                charContext.setStealthValue(data.stealthValue);
                charContext.setSurvivalValue(data.survivalValue);
                charContext.setStrSaving(data.strSaving);
                charContext.setDexSaving(data.dexSaving);
                charContext.setConSaving(data.conSaving);
                charContext.setIntSaving(data.intSaving);
                charContext.setWisSaving(data.wisSaving);
                charContext.setChaSaving(data.chaSaving);

            })
            .catch(error => {
                console.error("Error fetching character data:", error);
            })
    }, [characterId])

    return  (
        <>
            <h2>edit character page</h2>
            <h3>{charContext.characterName}</h3>
            <CharSheetHeader />
        </>
    )

}

export default EditCharacterPage