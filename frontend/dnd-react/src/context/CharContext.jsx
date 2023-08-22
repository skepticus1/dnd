import { createContext, useContext, useState } from "react";

const CharacterContext = createContext()

export const useCharacter = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({ children }) => {
    const num = 0
    const num10 = 10
    const str = ''

    const [charData, setCharData] = useState({
        
        // header data
        userName: str,
        charName: str,
        charClass: str,
        race: str,
        speed: num,
        size: num,
        level: num,
        alignment: str,
        background: str,
        age: str,
        height: str,
        weight: str,
        eyes: str,
        skin: str,
        hair: str,
        image_data: str,
        sex: str,

        // attributes
        strValue: num10,
        strBonus: num,
        dexValue: num10,
        dexBonus: num,
        conValue: num10,
        conBonus: num,
        intValue: num10,
        intBonus: num,
        wisValue: num10,
        wisBonus: num,
        chaValue: num10,
        chaBonus: num,

        // saving throws
        strSaving: num,
        dexSaving: num,
        conSaving: num,
        intSaving: num,
        wisSaving: num,
        chaSaving: num,

        // armor class, hit dice, death throws
        armorClass: num,
        initiative: num,
        currentHitPoints: num,
        tempHitPoints: num,
        hitDice: num,
        deathSuccess: num,
        deathFailure: num,

        // ideals bonds flaws personality
        personalityTraits: str,
        ideals: str,
        bonds: str,
        flaws: str,
    

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

        // languages
        languages: [],

        // traits
        traits: [],

        // features
        features: [],

        // proficiencies
        proficiencies: [],

        // spells
        spells: [],

        // equipment
        equipment: [],
        
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
            level: num,
            alignment: str,
            background: str,
            age: str,
            height: str,
            weight: str,
            eyes: str,
            skin: str,
            hair: str,
            image_data: str,
            sex: str,
    
            // attributes
            strValue: num10,
            strBonus: num,
            dexValue: num10,
            dexBonus: num,
            conValue: num10,
            conBonus: num,
            intValue: num10,
            intBonus: num,
            wisValue: num10,
            wisBonus: num,
            chaValue: num10,
            chaBonus: num,

            // saving throws
            strSaving: num,
            dexSaving: num,
            conSaving: num,
            intSaving: num,
            wisSaving: num,
            chaSaving: num,

            // armor class, hit dice, death throws
            armorClass: num,
            initiative: num,
            currentHitPoints: num,
            tempHitPoints: num,
            hitDice: num,
            deathSuccess: num,
            deathFailure: num,

            // ideals bonds flaws personality
            personalityTraits: str,
            ideals: str,
            bonds: str,
            flaws: str,
            // skills
            character_skills: {
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
    
            // languages
            character_languages: [],

            // traits
            character_traits: [],
    
            // features
            character_features: [],
    
            // proficiencies
            character_proficiencies: [],

            // spells
            character_spells: [],

            // equipment
            character_equipment: [],
        })    
    }

    const updateCharData = (key, value) => {
        //console.log(`setting ${key} to ${value}`)
        //console.log(typeof(value))
        //console.log(typeof(key))
        setCharData(prev => {
            const updatedData = { ...prev, [key]: value }
            //console.log('updateCharData: updatedData:', updatedData)
            return updatedData;
        })
    }

    const addLanguage = (language) => {
        console.log(language)
        setCharData(prev => {
            if(!prev.character_languages.includes(language)) {
                return {...prev, character_languages: [...prev.character_languages, language]}
            }
            return prev
        })
    }
    const removeLanguage = (language) => {
        setCharData(prev => {
            return {...prev, character_languages: prev.character_languages.filter(lang => lang != language )}
        })
    }
    
    const addTrait = (trait) => {
        console.log(trait)
        setCharData(prev => {
            if(!prev.character_traits.includes(trait)) {
                return {...prev, character_traits: [...prev.character_traits, trait]}
            }
            return prev
        })
    }
    const removeTrait = (trait) => {
        setCharData(prev => {
            return {...prev, character_traits: prev.character_traits.filter(t => t != trait )}
        })
    }
    
    const addFeature = (feature) => {
        console.log('addFeature : ', feature)
        setCharData(prev => {
            if(!prev.character_features.includes(feature)) {
                const updatedFeatures = {
                    ...prev,
                    character_features: [...prev.character_features, feature]
                }
                console.log('updatedFeatures: ', updatedFeatures)
                return updatedFeatures
            }
            return prev
        })
    }
    const removeFeature = (feature) => {
        setCharData(prev => {
            return {...prev, character_feature: prev.character_features.filter(f => f != feature )}
        })
    }
        
    const addProficiency = (prof) => {
        console.log(prof)
        setCharData(prev => {
            if(!prev.character_proficiencies.includes(prof)) {
                return {...prev, character_proficiencies: [...prev.character_proficiencies, prof]}
            }
            return prev
        })
    }
    const removeProficiency = (prof) => {
        setCharData(prev => {
            return {...prev, character_proficiencies: prev.character_proficiencies.filter(p => p != prof )}
        })
    }

    const addEquipment = (item) => {
        setCharData(prev => {
            return {...prev, character_equipment: [...prev.character_equipment, item]}
        })
    }

    const removeEquipment = (item) => {
        setCharData(prev => {
            return {...prev, character_equipment: prev.character_equipment.filter(i => i != item)}
        })
    }

    const addSpell = (spell) => {
        setCharData(prev => {
            if(!prev.character_spells.includes(spell)) {
                return {...prev, character_spells: [...prev.character_spells, spell]}
            }
            return prev
        })
    }
    const removeSpell = (spell) => {
        console.log("removing spell: ", spell)
        setCharData(prev => {
            return {...prev, character_spells: prev.character_spells.filter(s => s != spell)}
        })
    }


    const value = {
        charData, setCharData,
        // methods
        resetCharacter, updateCharData,
        addLanguage, removeLanguage,
        addTrait, removeTrait,
        addFeature, removeFeature,
        addProficiency, removeProficiency,
        addEquipment, removeEquipment,
        addSpell, removeSpell,

    }

    // console.log('logging charData from CharContext.jsx', charData)
    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    )
}