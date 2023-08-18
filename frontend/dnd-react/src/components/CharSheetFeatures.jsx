import { useEffect } from "react";
import { useCharacter } from "../context/CharContext";
import { useCreation } from "../context/CreationContext";
import axios from "axios";

const CharSheetFeatures = () => {
    const {
        charData, setCharData, 
        addLanguage, removeLanguage,
        addTrait, removeTrait,
        addFeature, removeFeature,
        addProficiency, removeProficiency,
    } = useCharacter()

    const { 
        currentLanguage, setCurrentLanguage,
        availableLanguages, setAvailableLanguages,
        availableTraits, setAvailableTraits,
        currentTrait, setCurrentTrait,
        availableFeatures, setAvailableFeatures,
        currentFeature, setCurrentFeature,
        availableProficiencies, setAvailableProficiencies,
        currentProficiency, setCurrentProficiency,
    } = useCreation()

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


    return (
        <>
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
        </>
    )
}

export default CharSheetFeatures