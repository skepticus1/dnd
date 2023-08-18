import { createContext, useState, useContext } from "react";

const CreationContext = createContext()

export const useCreation = () => {
    return useContext(CreationContext)
}

export const CreationProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);
    const [alignments, setAlignments] = useState([])
    const [backgrounds, setBackgrounds] = useState([])
    const [raceData, setRaceData] = useState()
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [availableTraits, setAvailableTraits] = useState([])
    const [currentTrait, setCurrentTrait] = useState('')
    const [availableFeatures, setAvailableFeatures] = useState([])
    const [currentFeature, setCurrentFeature] = useState('')
    const [availableProficiencies, setAvailableProficiencies] = useState([])
    const [currentProficiency, setCurrentProficiency] = useState('')
    const [availableEquipment, setAvailableEquipment] = useState([])
    const [currentEquipment, setCurrentEquipment] = useState('')
    const [availableSpells, setAvailableSpells] = useState([])
    const [currentSpell, setCurrentSpell] = useState('')

    

    const value = {
        classes, setClasses,
        races, setRaces,
        alignments, setAlignments,
        backgrounds, setBackgrounds,
        raceData, setRaceData,
        availableLanguages, setAvailableLanguages,
        currentLanguage, setCurrentLanguage,
        availableTraits, setAvailableTraits,
        currentTrait, setCurrentTrait,
        availableFeatures, setAvailableFeatures,
        currentFeature, setCurrentFeature,
        availableProficiencies, setAvailableProficiencies,
        currentProficiency, setCurrentProficiency,
        availableEquipment, setAvailableEquipment,
        currentEquipment, setCurrentEquipment,
        availableSpells, setAvailableSpells,
        currentSpell, setCurrentSpell,
    }

    return (
        <CreationContext.Provider value={value}>
            {children}
        </CreationContext.Provider>
    )
}