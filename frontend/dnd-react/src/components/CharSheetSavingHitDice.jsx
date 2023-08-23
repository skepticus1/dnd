import { useCharacter } from "../context/CharContext";
import { useEffect } from "react"

const CharSheetSavingHitDice = () => {
    const {charData, setCharData} = useCharacter()


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
        console.log(`setting ${stat} to ${event.target.value}`)
        const newValue = event.target.value
        setCharData(prev => ({
            ...prev,
            [stat]: newValue
        }))
        console.log(charData)
    }


    return (
        <>
            <div className="">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <strong>Saving Throws</strong>
                            {Object.entries(attributeToBonusMapping).map(([attribute, attr]) => ( // returns an array of an array. different than Object.keys
                                <div className="row mb-3" key={attribute}>
                                    <div className="col-4">
                                        {attribute}
                                    </div>
                                    <div className="col-4">
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
                    <div className="col-md-4 text-center">
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Armor Class</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.armorClass || 0}
                                    onChange={(e) => handleStatChange(e, 'armorClass')}
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-6">
                                <strong>Initiative</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.initiative || 0}
                                    onChange={(e) => handleStatChange(e, 'initiative')}
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-6">
                                <strong>Speed</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.speed || 0}
                                    onChange={(e) => handleStatChange(e, 'speed')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Current HP</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.currentHitPoints || 0}
                                    onChange={(e) => handleStatChange(e, 'currentHitPoints')}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Temp HP</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.tempHitPoints || 0}
                                    onChange={(e) => handleStatChange(e, 'tempHitPoints')}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Hit Dice</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.hitDice || 0}
                                    onChange={(e) => handleStatChange(e, 'hitDice')}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Death Save Success</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.deathSuccess || 0}
                                    onChange={(e) => handleStatChange(e, 'deathSuccess')}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Death Save Failure</strong>
                            </div>
                            <div className="col-4">
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.deathFailure || 0}
                                    onChange={(e) => handleStatChange(e, 'deathFailure')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
export default CharSheetSavingHitDice