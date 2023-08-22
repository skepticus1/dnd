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
            <div className="d-flex">
                <div className="col-md-4">
                    <strong>Personality Traits</strong>
                    <textarea 
                        rows="2"
                        maxLength="100"
                        className="form-control"
                        placeholder="Personality Traits..."
                        value={charData.personalityTraits || ''}
                        onChange={(e) => handleTextInputChange(e, 'personalityTraits')}
                    />
                    <strong>Ideals</strong>
                    <textarea
                        rows="2"
                        maxLength="100"
                        className="form-control"
                        placeholder="Ideals..."
                        value={charData.ideals || ''}
                        onChange={(e) => handleTextInputChange(e, 'ideals')}
                    />
                    <strong>Bonds</strong>
                    <textarea
                        rows="2"
                        maxLength="100"
                        className="form-control"
                        placeholder="Bonds"
                        value={charData.bonds || ''}
                        onChange={(e) => handleTextInputChange(e, 'bonds')}
                    />
                    <strong>Flaws</strong>
                    <textarea
                        rows="2"
                        maxLength="100"
                        className="form-control"
                        placeholder="Flaws"
                        value={charData.flaws || ''}
                        onChange={(e) => handleTextInputChange(e, 'flaws')}
                    />
                </div>
                <div className="col-md-4">
                    <strong>Languages</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select 
                                className="form-control"
                                value={currentLanguage} 
                                onChange={(e) => setCurrentLanguage(e.target.value)}>
                                {availableLanguages.map(lang =>
                                    <option key={lang.index} value={lang.name}>{lang.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-dark btn-block' onClick={() => addLanguage(currentLanguage)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_languages && charData.character_languages.length > 0 && charData.character_languages.map(lang => (
                            <li key={lang} className="list-group-item d-flex justify-content-between align-items-center">
                                {lang}
                                <button className='btn btn-danger btn-sm' onClick={() => removeLanguage(lang)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <strong>Proficiencies</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select 
                                className="form-control"
                                value={currentProficiency} 
                                onChange={(e) => setCurrentProficiency(e.target.value)}>
                                {availableProficiencies.map(prof =>
                                    <option key={prof.index} value={prof.name}>{prof.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark btn-block" onClick={() => addProficiency(currentProficiency)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_proficiencies && charData.character_proficiencies.length > 0 && charData.character_proficiencies.map(prof => (
                            <li key={prof} className="list-group-item d-flex justify-content-between align-items-center">
                                {prof}
                                <button className="btn btn-danger btn-sm" onClick={() => removeProficiency(prof)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <strong>Features</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select 
                                className="form-control"
                                value={currentFeature} 
                                onChange={(e) => setCurrentFeature(e.target.value)}>
                                {availableFeatures.map(f =>
                                    <option key={f.index} value={f.name}>{f.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark btn-block" onClick={() => addFeature(currentFeature)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_features && charData.character_features.length > 0 && charData.character_features.map(f => (
                            <li key={f} className="list-group-item d-flex justify-content-between align-items-center">
                                {f}
                                <button className="btn btn-danger btn-sm" onClick={() => removeFeature(f)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <strong>Traits</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select 
                                className="form-control"
                                value={currentTrait} 
                                onChange={(e) => setCurrentTrait(e.target.value)}>
                                {availableTraits.map(t =>
                                    <option key={t.index} value={t.name}>{t.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark btn-block" onClick={() => addTrait(currentTrait)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_traits && charData.character_traits.length > 0 && charData.character_traits.map(t => (
                            <li key={t} className="list-group-item d-flex justify-content-between align-items-center">
                                {t}
                                <button className="btn btn-danger btn-sm" onClick={() => removeTrait(t)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CharSheetFeatures