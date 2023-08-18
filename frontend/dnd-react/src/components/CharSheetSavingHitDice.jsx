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
        const newValue = event.target.value
        setCharData(prev => ({
            ...prev,
            [stat]: newValue
        }))
    }


    return (
        <>
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
                                    value={charData.armorClass || 0}
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
                                    value={charData.initiative || 0}
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
                                    value={charData.currentHitPoints || 0}
                                    onChange={(e) => handleStatChange(e, 'currentHitPoints')}
                                />
                            </div>
                            <div>
                                temp hp
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.tempHitPoints || 0}
                                    onChange={(e) => handleStatChange(e, 'tempHitPoints')}
                                />
                            </div>
                            <div>
                                hit dice
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.hitDice || 0}
                                    onChange={(e) => handleStatChange(e, 'hitDice')}
                                />
                            </div>
                            <div className="">
                                death saves success     
                                <input 
                                    type="number" 
                                    className="form-control"
                                    value={charData.deathSuccess || 0}
                                    onChange={(e) => handleStatChange(e, 'deathSuccess')}
                                />
                            </div>
                            <div className="">
                                death saves failure
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