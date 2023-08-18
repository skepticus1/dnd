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
            <div className='border d-flex'>
                <div className="col-md-4">
                    skills
                    <ul>
                        {charData.character_skills && Object.entries(charData.character_skills).map(([skillName, skillValue]) => (
                            <li key={skillName}>
                                {formatSkillName(skillName)}:
                                <input 
                                    type='number'
                                    className="form-control"
                                    value={skillValue || 0}
                                    onChange={(e) => handleSkillChange(skillName, e.target.value)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='col-md-4'>
                    <div>
                        spells
                        <select 
                            className=""
                            value={currentSpell} 
                            onChange={(e) => setCurrentSpell(e.target.value)}>
                                {availableSpells && availableSpells.length > 0 && availableSpells.map(spell =>
                                    <option key={spell.index} value={spell.name}>{spell.name}</option>
                                )}
                        </select>
                        <button onClick={() => addSpell(currentSpell)}>+</button>
                    </div>
                    <ul>
                        {charData.character_spells && charData.character_spells.length > 0 && charData.character_spells.map(spell => (
                            <li key={spell}>
                                {spell}
                                <button onClick={() => removeSpell(spell)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <div>
                        equipment
                        <select value={currentEquipment} onChange={(event) => setCurrentEquipment(event.target.value)}>
                            {availableEquipment && availableEquipment.length > 0 && availableEquipment.map(equip =>
                                <option key={equip.index} value={equip.name}>{equip.name}</option>
                            )}
                        </select>
                        <button onClick={() => addEquipment(currentEquipment)}>+</button>
                    </div>
                    <ul>
                        {charData.character_equipment && charData.character_equipment.length > 0 && charData.character_equipment.map(equip => (
                            <li key={equip}>
                                {equip}
                                <button onClick={() => removeEquipment(equip)}>-</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CharSheetEquipmentSpells