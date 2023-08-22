import { useEffect } from "react";
import { useCharacter } from "../context/CharContext";
import { useCreation } from "../context/CreationContext";

const CharSheetEquipmentSpells = () => {
    const {
        charData, setCharData,
        addEquipment, removeEquipment,
        addSpell, removeSpell,
    } = useCharacter()

    const {
        availableEquipment, setAvailableEquipment,
        currentEquipment, setCurrentEquipment,
        availableSpells, setAvailableSpells,
        currentSpell, setCurrentSpell,
    } = useCreation()

    // FETCH EQUIPMENT
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/equipment/')
            .then(response => response.json())
            .then(data => {
                setAvailableEquipment(data.results)
            })
            .catch(error => {
                console.error('error fetching equipment: ', error)
            })
    }, [setAvailableEquipment])

    // FETCH SPELLS
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/spells/')
            .then(response => response.json())
            .then(data => {
                setAvailableSpells(data.results)
            })
            .catch(error => {
                console.error('error fetching spells: ', error)
            })
    }, [setAvailableSpells])

    const formatSkillName = (skillName) => {
        const formattedName = skillName.replace('Value', '')
        return formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
    }

    const handleSkillChange = (skillName, newValue) => {
        const updatedCharData = {...charData}
        updatedCharData.character_skills[skillName] = Number(newValue)
        setCharData(updatedCharData)
        console.log(charData)
    }

    return (
        <>
            <div className='d-flex'>
                <div className="col-md-4">
                    <strong className="">Skills</strong>
                    
                        <ul>
                            {charData.character_skills && Object.entries(charData.character_skills).map(([skillName, skillValue]) => (
                                

                                    <li key={skillName} className="mb-2">
                                        <div className="row">
                                           <div className="col-6">
                                                <label className="mr-2">{formatSkillName(skillName)}:</label>
                                            </div> 
                                            <div className="col-4">
                                                <input 
                                                    type='number'
                                                    className="form-control col-md-4"
                                                    value={skillValue || 0}
                                                    onChange={(e) => handleSkillChange(skillName, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                
                            ))}
                        </ul>
                    
                </div>
                <div className='col-md-4'>
                    <strong>Spells</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select 
                                className="form-control"
                                value={currentSpell} 
                                onChange={(e) => setCurrentSpell(e.target.value)}>
                                    {availableSpells && availableSpells.length > 0 && availableSpells.map(spell =>
                                        <option key={spell.index} value={spell.name}>{spell.name}</option>
                                    )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark btn-block" onClick={() => addSpell(currentSpell)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_spells && charData.character_spells.length > 0 && charData.character_spells.map(spell => (
                            <li key={spell} className="list-group-item d-flex justify-content-between align-items-center">
                                {spell}
                                <button className='btn btn-danger btn-sm' onClick={() => removeSpell(spell)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <strong>Equipment</strong>
                    <div className="row mb-3">
                        <div className="col-8">
                            <select
                                className="form-control" 
                                value={currentEquipment} 
                                onChange={(event) => setCurrentEquipment(event.target.value)}>
                                {availableEquipment && availableEquipment.length > 0 && availableEquipment.map(equip =>
                                    <option key={equip.index} value={equip.name}>{equip.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark" onClick={() => addEquipment(currentEquipment)}>+</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {charData.character_equipment && charData.character_equipment.length > 0 && charData.character_equipment.map(equip => (
                            <li key={equip} className="list-group-item d-flex justify-content-between align-items-center">
                                {equip}
                                <button className='btn btn-danger btn-sm' onClick={() => removeEquipment(equip)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CharSheetEquipmentSpells