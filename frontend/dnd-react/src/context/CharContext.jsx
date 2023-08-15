import { createContext, useContext, useState } from "react";

const CharacterContext = createContext()

export const useCharacter = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({ children }) => {
    const defaultValue = 0

    // states for character main details
    const [characterName, setCharacterName] = useState('');
    const [background, setBackground] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [race, setRace] = useState('')
    const [alignment, setAlignment] = useState('')

    // states for character attributes
    const [strValue, setStrValue] = useState(defaultValue)
    const [strBonus, setStrBonus] = useState(defaultValue)
    const [dexValue, setDexValue] = useState(defaultValue)
    const [dexBonus, setDexBonus] = useState(defaultValue)
    const [conValue, setConValue] = useState(defaultValue)
    const [conBonus, setConBonus] = useState(defaultValue)
    const [intValue, setIntValue] = useState(defaultValue)
    const [intBonus, setIntBonus] = useState(defaultValue)
    const [wisValue, setWisValue] = useState(defaultValue)
    const [wisBonus, setWisBonus] = useState(defaultValue)
    const [chaValue, setChaValue] = useState(defaultValue)
    const [chaBonus, setChaBonus] = useState(defaultValue)

    // states for character skills    
    const [acrobaticsValue, setAcrobaticsValue] = useState(defaultValue);
    const [animalHandlingValue, setAnimalHandlingValue] = useState(defaultValue);
    const [arcanaValue, setArcanaValue] = useState(defaultValue);
    const [athleticsValue, setAthleticsValue] = useState(defaultValue);
    const [deceptionValue, setDeceptionValue] = useState(defaultValue);
    const [historyValue, setHistoryValue] = useState(defaultValue);
    const [insightValue, setInsightValue] = useState(defaultValue);
    const [intimidationValue, setIntimidationValue] = useState(defaultValue);
    const [investigationValue, setInvestigationValue] = useState(defaultValue);
    const [medicineValue, setMedicineValue] = useState(defaultValue);
    const [natureValue, setNatureValue] = useState(defaultValue);
    const [perceptionValue, setPerceptionValue] = useState(defaultValue);
    const [performanceValue, setPerformanceValue] = useState(defaultValue);
    const [persuasionValue, setPersuasionValue] = useState(defaultValue);
    const [religionValue, setReligionValue] = useState(defaultValue);
    const [sleightOfHandValue, setSleightOfHandValue] = useState(defaultValue);
    const [stealthValue, setStealthValue] = useState(defaultValue);
    const [survivalValue, setSurvivalValue] = useState(defaultValue);

    // saving throw states
    const [strSaving, setStrSaving] = useState(defaultValue);
    const [dexSaving, setDexSaving] = useState(defaultValue);
    const [conSaving, setConSaving] = useState(defaultValue);
    const [intSaving, setIntSaving] = useState(defaultValue);
    const [wisSaving, setWisSaving] = useState(defaultValue);
    const [chaSaving, setChaSaving] = useState(defaultValue);


    const resetCharacter = () => {
        setCharacterName('');
        setBackground('');
        setCharacterClass('');
        setPlayerName('');
        setRace('');
        setAlignment('');
        // attributes
        setStrValue(defaultValue);
        setStrBonus(defaultValue);
        setDexValue(defaultValue);
        setDexBonus(defaultValue);
        setConValue(defaultValue);
        setConBonus(defaultValue);
        setIntValue(defaultValue);
        setIntBonus(defaultValue);
        setWisValue(defaultValue);
        setWisBonus(defaultValue);
        setChaValue(defaultValue);
        setChaBonus(defaultValue);
        // skills
        setAcrobaticsValue(defaultValue);
        setAnimalHandlingValue(defaultValue);
        setArcanaValue(defaultValue);
        setAthleticsValue(defaultValue);
        setDeceptionValue(defaultValue);
        setHistoryValue(defaultValue);
        setInsightValue(defaultValue);
        setIntimidationValue(defaultValue);
        setInvestigationValue(defaultValue);
        setMedicineValue(defaultValue);
        setNatureValue(defaultValue);
        setPerceptionValue(defaultValue);
        setPerformanceValue(defaultValue);
        setPersuasionValue(defaultValue);
        setReligionValue(defaultValue);
        setSleightOfHandValue(defaultValue);
        setStealthValue(defaultValue);
        setSurvivalValue(defaultValue);
        // saving throws
        setStrSaving(defaultValue)
        setDexSaving(defaultValue)
        setConSaving(defaultValue)
        setIntSaving(defaultValue)
        setWisSaving(defaultValue)
        setChaSaving(defaultValue)
    }

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
        survivalValue, setSurvivalValue,
        // saving throws
        strSaving, setStrSaving,
        dexSaving, setDexSaving,
        conSaving, setConSaving,
        intSaving, setIntSaving,
        wisSaving, setWisSaving,
        chaSaving, setChaSaving,
            

        // methods
        resetCharacter,

    }


    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}