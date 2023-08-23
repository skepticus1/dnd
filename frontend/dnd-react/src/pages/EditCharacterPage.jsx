import { useEffect } from "react";
import { useCharacter } from "../context/CharContext";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCreation } from "../context/CreationContext";
import axios from "axios";

const EditCharacterPage = () => {
    const { characterId } = useParams();
    const userContext = useUser()

    const { 
        charData, setCharData, 
        updateCharData,
        addLanguage, removeLanguage,
        addTrait, removeTrait,
        addFeature, removeFeature,
        addProficiency, removeProficiency,
    } = useCharacter()
    
    const {
        classes, setClasses,
        races, setRaces,
        alignments, setAlignments,
        backgrounds, setBackgrounds,
        raceData, setRaceData,
        currentLanguage, setCurrentLanguage,
        availableLanguages, setAvailableLanguages,
        availableTraits, setAvailableTraits,
        currentTrait, setCurrentTrait,
        availableFeatures, setAvailableFeatures,
        currentFeature, setCurrentFeature,
        availableProficiencies, setAvailableProficiencies,
        currentProficiency, setCurrentProficiency,
    } = useCreation()

    // ts useEffect


    // get class data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes/')
            .then(response => response.json())
            .then(data => {
                setClasses(data.results);
            })
            .catch(error => {
                console.error('error fetching classes: ', error);
            })
    }, [setClasses])

    // handle class change
    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        updateCharData('charClass', selectedClass)
    }
    

    // get race data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races/')
            .then(response => response.json())
            .then(data => {
                setRaces(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setRaces])

    // handle race change
    const handleRaceChange = (event) => {
        const selectedRace = event.target.value;
        updateCharData('race', selectedRace)

        if(selectedRace) {
            axios.get(`https://www.dnd5eapi.co/api/races/${selectedRace}`)
                .then(response => {
                    const raceDetails = response.data
                    updateCharData('speed', raceDetails.speed)
                    updateCharData('size', raceDetails.size)
                    setRaceData(raceDetails)
                })
                .catch(error => {
                    console.error('There was an eroor fetching the race details:', error)
                })
        }
    }

    // get alignment data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/alignments/')
            .then(response => response.json())
            .then(data => {
                setAlignments(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setAlignments])

    // handle alignment change
    const handleAlignmentChange = (event) => {
        const selectedAlignment = event.target.value;
        updateCharData('alignment', selectedAlignment)
    }
   

    // get background data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/backgrounds/')
            .then(response => response.json())
            .then(data => {
                setBackgrounds(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setBackgrounds])

    // handle background change
    const handleBackgroundChange = (event) => {
        const selectedBackground = event.target.value;
        updateCharData('background', selectedBackground)
    }

    // fetch character data from backend ********************************
    useEffect(() => {
        // api call to fetch character data
        axios.get(`${userContext.backendURL}chars/edit/${characterId}/`)
            .then(response => {
                const data = response.data 
                setCharData(data)
            })
            .catch(error => {
                console.error("Error fetching character data:", error);
            })
    }, [characterId, userContext, setCharData])

    // attribute functions
    const attributes = [
        { name: 'STR', key: 'str' },
        { name: 'DEX', key: 'dex' },
        { name: 'CON', key: 'con' },
        { name: 'INT', key: 'int' },
        { name: 'WIS', key: 'wis' },
        { name: 'CHA', key: 'cha' },
    ];
    
    const getRaceAttributeBonus = (attributeKey) => {
        if (!raceData) return 0;
        const bonusData = raceData.ability_bonuses.find(bonus => bonus.ability_score.index === attributeKey);
        return bonusData ? bonusData.bonus : 0;
    }

    const handleAttributeChange = (e, attributeKey) => {
        // console.log(attributeKey)
        const newValue = e.target.value;
        const raceBonus = getRaceAttributeBonus(attributeKey)
        const totalValue = parseInt(newValue) + raceBonus
        const newBonus = Math.floor((totalValue - 10) / 2 )
        setCharData(prevData => ({
            ...prevData,
            [attributeKey + "Value"]: newValue,
            [attributeKey + "Bonus"]: newBonus
        }))
    }

    // savinghitdice ***************************************
    const attributeToBonusMapping = {
        "Strength" : "str",
        "Dexterity" : "dex",
        "Constitution" : "con",
        "Intelligence" : "int",
        "Wisdom" : "wis",
        "Charisma" : "cha",
    }

    const handleSavingThrowChange = (attribute, event) => {
        const newValue = event.target.value;
        setCharData(prev => ({
            ...prev,
            [attribute + "Saving"]: newValue
        }))
    }
    
    const handleStatChange = (event, stat) => {
        const newValue = event.target.value
        setCharData(prev => ({
            ...prev,
            [stat]: newValue
        }))
    }

    // features section **********************************
    // FETCH LANGUAGES
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/languages/')
            .then(response => response.json())
            .then(data => {
                setAvailableLanguages(data.results)
            })
            .catch(error => {
                console.error('error fetching languages: ', error)
            })
    }, [setAvailableLanguages])

    // FETCH TRAITS
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/traits/')
            .then(response => response.json())
            .then(data => {
                setAvailableTraits(data.results)
            })
            .catch(error => {
                console.error('error fetching traits: ', error)
            })
    }, [setAvailableTraits])

    //FETCH FEATURES
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/features/')
            .then(response => response.json())
            .then(data => {
                setAvailableFeatures(data.results)
            })
            .catch(error => {
                console.error('error fetching features: ', error)
            })
    }, [setAvailableFeatures])
    
    //FETCH PROFICIENCIES
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/proficiencies/')
            .then(response => response.json())
            .then(data => {
                setAvailableProficiencies(data.results)
            })
            .catch(error => {
                console.error('error fetching proficiencies: ', error)
            })
    }, [setAvailableProficiencies])

    const handleTextInputChange = (event, key) => {
        const newValue = event.target.value
        setCharData(prev => ({
            ...prev,
            [key]: newValue
        }))
    }

    
    const handleSave = () => {

    }

    return  (
        <div className="border p-2">
            <div className="row border p-2">
                <div className="col-md-4">
                    img
                </div>
                <div className="col-md-4">
                    <label htmlFor="age" className="small text-center d-block">Age</label>
                    <input 
                        id='age'
                        type="number" 
                        className="form-control" 
                        placeholder="Age"
                        value={charData.age || ''}
                        onChange={(e) => updateCharData('age', e.target.value)}
                    />
                    <label htmlFor="height" className="small text-center d-block">Height</label>
                    <input 
                        id='height'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Height"
                        value={charData.height || ''}
                        onChange={(e) => updateCharData('height', e.target.value)}
                    />
                    <label htmlFor="weight" className="small text-center d-block">Weight</label>
                    <input 
                        id='weight'
                        type="number" 
                        className="form-control" 
                        placeholder="Character Weight"
                        value={charData.weight || ''}
                        onChange={(e) => updateCharData('weight', e.target.value)}
                    />
                    <label htmlFor="eye" className="small text-center d-block">Eye</label>
                    <input 
                        id='eue'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Eye"
                        value={charData.eye || ''}
                        onChange={(e) => updateCharData('eye', e.target.value)}
                    />
                    <label htmlFor="skin" className="small text-center d-block">Skin</label>
                    <input 
                        id='skin'
                        type="test" 
                        className="form-control" 
                        placeholder="Character Skin"
                        value={charData.skin || ''}
                        onChange={(e) => updateCharData('skin', e.target.value)}
                    />
                    <label htmlFor="hair" className="small text-center d-block">Hair</label>
                    <input 
                        id='hair'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Hair"
                        value={charData.hair || ''}
                        onChange={(e) => updateCharData('hair', e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="charName" className="small text-center d-block">Name</label>
                    <input
                        id='charName'
                        type="text" 
                        className="form-control mb-2"
                        placeholder="Character Name"
                        value={charData.charName || ''}
                        onChange={(e) => updateCharData('charName', e.target.value)}
                    />
                    <label htmlFor="background" className="small text-center d-block">Background</label>
                    <select className="form-control" value={charData.background || ''} onChange={handleBackgroundChange}>
                        <option className="text-center" value="">... select ...</option>
                        {backgrounds.map(background => (
                            <option key={background.index} value={background.index}>
                                {background.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="characterClass" className="small text-center d-block">Class</label>
                    <select className="form-control" value={charData.charClass || ""} onChange={handleClassChange}>
                        <option className="text-center" value="">... select ...</option>
                        {classes.map(cls => (
                            <option key={cls.index} value={cls.index}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="level" className="small text-center d-block">Level</label>
                    <input 
                        id='level'
                        type="number" 
                        className="form-control" 
                        placeholder="Character Level"
                        value={charData.level || ''}
                        onChange={(e) => updateCharData('level', e.target.value)}
                    />
                    <label htmlFor="race" className="small text-center d-block">Race</label>
                    <select className="form-control" value={charData.race || ""} onChange={handleRaceChange}>
                        <option className="text-center" value="">... select ...</option>
                        {races.map(race => (
                            <option key={race.index} value={race.index}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="alignment" className="small text-center d-block">Alignment</label>
                    <select className="form-control" value={charData.alignment || ""} onChange={handleAlignmentChange}>
                        <option className="text-center" value="">... select ...</option>
                        {alignments.map(alignment => (
                            <option key={alignment.index} value={alignment.index}>
                                {alignment.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
            <div className="small text-center">
                Attributes
                <div className="row border p-1">
                        {attributes.map((attribute, index) => (
                            <div key={index} className='col-md-2'>
                                <div className="d-flex">
                                    <label className='text-center m-2'>{attribute.name}</label>
                                    <input 
                                        type="number" 
                                        className="form-control text-center" 
                                        placeholder={attribute.name} 
                                        value={charData[attribute.key + "Value"] || 0}
                                        onChange={(e) => handleAttributeChange(e, attribute.key)} 
                                    />
                                    {` + ${getRaceAttributeBonus(attribute.key)}` || 0 }
                                </div>
                                <div className="d-flex">
                                    <label className='text-center m-2'>Bonus</label>
                                    <div className='form-control text-center p-1'>
                                        {charData[attribute.key + "Bonus"] || 0}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="small text-center">
                Saving Throws and Hit Dice
                <div className="row border p-1">
                    <div className="col-md-4 d-flex flex-column border">
                        <strong>Saving Throws</strong>
                            
                                {Object.entries(attributeToBonusMapping).map(([attribute, attr]) => ( // returns an array of an array. different than Object.keys
                                    <div className="d-flex" key={attribute}>
                                        <div className="d-flex">
                                            {attribute}
                                            <input
                                                type='number'
                                                className='form-control ml-2'
                                                value={charData[attr + 'Saving'] || 0}
                                                onChange={(e) => handleSavingThrowChange(attr, e)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className='d-flex border-top'>
                                    <input type="checkbox" />
                                    <div className='ml-2'>Inspiration</div>
                                </div>
                                <div className='d-flex border-bottom'>
                                    <input type="checkbox" />
                                    <div>Proficiency Bonus</div>
                                </div>
                            
                    </div>

                    
                    <div className="col-md-4">
                        <div className='m-1'>
                            <div>
                                Armor Class
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.armorClass}
                                    onChange={(e) => handleStatChange(e, 'armorClass')}
                                />
                            </div>
                        </div>
                        <div className='m-1'>
                            <div>
                                Initiative
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.initiative}
                                    onChange={(e) => handleStatChange(e, 'initiative')}
                                />
                            </div>
                        </div>
                        <div className='m-1'>
                            <div>
                                speed
                            </div>
                            <div>
                                {charData.speed}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                current hp
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.currentHitPoints}
                                    onChange={(e) => handleStatChange(e, 'currentHitPoints')}
                                />
                            </div>
                            <div>
                                temp hp
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.tempHitPoints}
                                    onChange={(e) => handleStatChange(e, 'tempHitPoints')}
                                />
                            </div>
                            <div>
                                hit dice
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.hitDice}
                                    onChange={(e) => handleStatChange(e, 'hitDice')}
                                />
                            </div>
                            <div className="">
                                death saves success     
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.deathSuccess}
                                    onChange={(e) => handleStatChange(e, 'deathSuccess')}
                                />
                            </div>
                            <div className="">
                                death saves failure
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.deathFailure}
                                    onChange={(e) => handleStatChange(e, 'deathFailure')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border d-flex">
                <div className="col-md-4">
                    <div className="">
                        Personality Traits
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Personality Traits"
                        value={charData.personalityTraits || 'Personality Traits...'}
                        onChange={(e) => handleTextInputChange(e, 'personalityTraits')}
                    />
                    <div>
                        Ideals
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ideals"
                        value={charData.ideals || 'Ideals...'}
                        onChange={(e) => handleTextInputChange(e, 'ideals')}
                    />
                    <div>
                        Bonds
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Bonds"
                        value={charData.bonds || 'Bonds...'}
                        onChange={(e) => handleTextInputChange(e, 'bonds')}
                    />
                    <div>
                        Flaws
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Flaws"
                        value={charData.flaws || 'Flaws...'}
                        onChange={(e) => handleTextInputChange(e, 'flaws')}
                    />
                </div>
                <div className="col-md-4">
                    <div>
                        Languages
                        <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
                            {availableLanguages.map(lang =>
                                <option key={lang.index} value={lang.name}>{lang.name}</option>
                            )}
                        </select>
                        <button onClick={() => addLanguage(currentLanguage)}>+</button>
                    </div>
                    <ul>
                        Known
                        {charData.character_languages && charData.character_languages.length > 0 && charData.character_languages.map(lang => (
                            <li key={lang}>
                                {lang}
                                <button onClick={() => removeLanguage(lang)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        Proficiencies
                        <select value={currentProficiency} onChange={(e) => setCurrentProficiency(e.target.value)}>
                            {availableProficiencies.map(prof =>
                                <option key={prof.index} value={prof.name}>{prof.name}</option>
                            )}
                        </select>
                        <button onClick={() => addProficiency(currentProficiency)}>+</button>
                    </div>
                    <ul>
                        {charData.character_proficiencies && charData.character_proficiencies.length > 0 && charData.character_proficiencies.map(prof => (
                            <li key={prof}>
                                {prof}
                                <button onClick={() => removeProficiency(prof)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <div>
                        Features
                        <select value={currentFeature} onChange={(e) => setCurrentFeature(e.target.value)}>
                            {availableFeatures.map(f =>
                                <option key={f.index} value={f.name}>{f.name}</option>
                            )}
                        </select>
                        <button onClick={() => addFeature(currentFeature)}>+</button>
                    </div>
                    <ul>
                        {charData.character_features && charData.character_features.length > 0 && charData.character_features.map(f => (
                            <li key={f}>
                                {f}
                                <button onClick={() => removeFeature(f)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        Traits
                        <select value={currentTrait} onChange={(e) => setCurrentTrait(e.target.value)}>
                            {availableTraits.map(t =>
                                <option key={t.index} value={t.name}>{t.name}</option>
                            )}
                        </select>
                        <button onClick={() => addTrait(currentTrait)}>+</button>
                    </div>
                    <ul>
                        {charData.character_traits && charData.character_traits.length > 0 && charData.character_traits.map(t => (
                            <li key={t}>
                                {t}
                                <button onClick={() => removeTrait(t)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            </div>
            <div>

            </div>
            <div className="row">
                <div className="col-md-12">
                    <button
                        type='submit'
                        className="btn btn-dark"
                        onClick={handleSave}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}


export default EditCharacterPage