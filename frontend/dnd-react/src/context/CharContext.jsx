import { createContext, useContext, useState } from "react";

const CharacterContext = createContext()

export const useCharacter = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({ children }) => {
    const num = 0
    const str = ''

    const [charData, setCharData] = useState({
        
        // header data
        userName: str,
        charName: str,
        charClass: str,
        race: str,
        speed: num,
        size: num,
        age: num,
        level: num,
        alignment: str,
        background: str,

        // attributes
        strValue: num,
        strBonus: num,
        dexValue: num,
        dexBonus: num,
        conValue: num,
        conBonus: num,
        intValue: num,
        intBonus: num,
        wisValue: num,
        wisBonus: num,
        chaValue: num,
        chaBonus: num,

        // skills
        skills: {
            acrobaticsValue: num,
            animalHandlingValue: num,
            arcanaValue: num,
            athleticsValue: num,
            deceptionValue: num,
            historyValue: num,
            insightValue: num,
            intimidationValue: num,
            investigationValue: num,
            medicineValue: num,
            natureValue: num,
            perceptionValue: num,
            performanceValue: num,
            persuasionValue: num,
            religionValue: num,
            sleightOfHandValue: num,
            stealthValue: num,
            survivalValue: num,
        },

        // traits
        
    })

    const resetCharacter = () => {
        setCharData({
        
            // header data
            userName: str,
            charName: str,
            charClass: str,
            race: str,
            speed: num,
            size: num,
            age: num,
            level: num,
            alignment: str,
            background: str,
    
            // attributes
            strValue: num,
            strBonus: num,
            dexValue: num,
            dexBonus: num,
            conValue: num,
            conBonus: num,
            intValue: num,
            intBonus: num,
            wisValue: num,
            wisBonus: num,
            chaValue: num,
            chaBonus: num,
    
            // skills
            skills: {
                acrobaticsValue: num,
                animalHandlingValue: num,
                arcanaValue: num,
                athleticsValue: num,
                deceptionValue: num,
                historyValue: num,
                insightValue: num,
                intimidationValue: num,
                investigationValue: num,
                medicineValue: num,
                natureValue: num,
                perceptionValue: num,
                performanceValue: num,
                persuasionValue: num,
                religionValue: num,
                sleightOfHandValue: num,
                stealthValue: num,
                survivalValue: num,
            },
    
            // traits
        })    
    }

    const updateCharData = (key, value) => {
        console.log(`setting ${key} to ${value}`)
        setCharData(prev => {
            const updatedData = { ...prev, [key]: value }
            console.log('updateCharData: updatedData:', updatedData)
            return updatedData;
        })
    }

    const value = {
        charData,
        setCharData,
        // methods
        resetCharacter,
        updateCharData,


    }


    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}