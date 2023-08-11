import { createContext, useContext, useState } from "react";

const CharacterContext = createContext()

export const useCharacter = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({ children }) => {
    // states for character main details
    const [characterName, setCharacterName] = useState('');
    const [background, setBackground] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [race, setRace] = useState('')
    const [alignment, setAlignment] = useState('')

    // states for character attributes
    const [strValue, setStrValue] = useState('')
    const [strBonus, setStrBonus] = useState('')
    const [dexValue, setDexValue] = useState('')
    const [dexBonus, setDexBonus] = useState('')
    const [conValue, setConValue] = useState('')
    const [conBonus, setConBonus] = useState('')
    const [intValue, setIntValue] = useState('')
    const [intBonus, setIntBonus] = useState('')
    const [wisValue, setWisValue] = useState('')
    const [wisBonus, setWisBonus] = useState('')
    const [chaValue, setChaValue] = useState('')
    const [chaBonus, setChaBonus] = useState('')

    // states for character skills    
    const [acrobaticsValue, setAcrobaticsValue] = useState('');
    const [animalHandlingValue, setAnimalHandlingValue] = useState('');
    const [arcanaValue, setArcanaValue] = useState('');
    const [athleticsValue, setAthleticsValue] = useState('');
    const [deceptionValue, setDeceptionValue] = useState('');
    const [historyValue, setHistoryValue] = useState('');
    const [insightValue, setInsightValue] = useState('');
    const [intimidationValue, setIntimidationValue] = useState('');
    const [investigationValue, setInvestigationValue] = useState('');
    const [medicineValue, setMedicineValue] = useState('');
    const [natureValue, setNatureValue] = useState('');
    const [perceptionValue, setPerceptionValue] = useState('');
    const [performanceValue, setPerformanceValue] = useState('');
    const [persuasionValue, setPersuasionValue] = useState('');
    const [religionValue, setReligionValue] = useState('');
    const [sleightOfHandValue, setSleightOfHandValue] = useState('');
    const [stealthValue, setStealthValue] = useState('');
    const [survivalValue, setSurvivalValue] = useState('');

    const value = {
        // main details
        characterName, setCharacterName,
        background, setBackground,
        characterClass, setCharacterClass,
        playerName, setPlayerName,
        race, setRace,
        alignment, setAlignment,
        // attributes
        strValue, setStrValue,
        strBonus, setStrBonus,
        dexValue, setDexValue,
        dexBonus, setDexBonus,
        conValue, setConValue,
        conBonus, setConBonus,
        intValue, setIntValue,
        intBonus, setIntBonus,
        wisValue, setWisValue,
        wisBonus, setWisBonus,
        chaValue, setChaValue,
        chaBonus, setChaBonus,
        // skills
        acrobaticsValue, setAcrobaticsValue,
        animalHandlingValue, setAnimalHandlingValue,
        arcanaValue, setArcanaValue,
        athleticsValue, setAthleticsValue,
        deceptionValue, setDeceptionValue,
        historyValue, setHistoryValue,
        insightValue, setInsightValue,
        intimidationValue, setIntimidationValue,
        investigationValue, setInvestigationValue,
        medicineValue, setMedicineValue,
        natureValue, setNatureValue,
        perceptionValue, setPerceptionValue,
        performanceValue, setPerformanceValue,
        persuasionValue, setPersuasionValue,
        religionValue, setReligionValue,
        sleightOfHandValue, setSleightOfHandValue,
        stealthValue, setStealthValue,
        survivalValue, setSurvivalValue

    }

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}