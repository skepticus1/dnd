import { useCharacter } from "../context/CharContext";

const CharSheetPageOneLeft = () => {

    // characters attributes and set method.
    const {
        strValue, setStrValue,
        strBonus, setStrBonus,
        dexValue, setDexValue,
        dexBonus, setDexBonus,
        conValue, setConValue,
        conBonus, setConBonus,
        intValue, setIntValue,
        intBonus, setIntBonus,
        wisValue, setWisValue,
        wisBonus, setWisBonus,
        chaValue, setChaValue,
        chaBonus, setChaBonus,
    } = useCharacter()

    const attributes = [
        { name: 'STR', value: strValue, bonus: strBonus, setValue: setStrValue, setBonus: setStrBonus },
        { name: 'DEX', value: dexValue, bonus: dexBonus, setValue: setDexValue, setBonus: setDexBonus },
        { name: 'CON', value: conValue, bonus: conBonus, setValue: setConValue, setBonus: setConBonus },
        { name: 'INT', value: intValue, bonus: intBonus, setValue: setIntValue, setBonus: setIntBonus },
        { name: 'WIS', value: wisValue, bonus: wisBonus, setValue: setWisValue, setBonus: setWisBonus },
        { name: 'CHA', value: chaValue, bonus: chaBonus, setValue: setChaValue, setBonus: setChaBonus },
    ];
    
    const attributeName = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
    ]
    
    const skills = [
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "Sleight of Hand",
        "Stealth",
        "Survival"
      ];

    // handle the button for rolling the dice for attributes
    const attributeRoll = () => {
        const newAttributes = attributes.map(attribute => {
            const rolls = [];
            for(let i = 0; i < 3; i++){
                rolls.push(Math.floor(Math.random() * 6) + 1);
            }
            const total = rolls.reduce((sum, roll) => sum + roll, 0);
            const newValue = total.toString()
            const newBonus = Math.floor((total -10)/2).toString()
            attribute.setValue(newValue)
            attribute.setBonus(newBonus)
        })
    }


    return (
        <>
            <div className="small text-center">Attributes
                <div>
                    <button className='btn btn-dark m-1' onClick={() => attributeRoll()}>Roll</button>
                </div>
                <div className="d-flex">
                    <div>
                        {attributes.map((attribute, index) => (
                            <div key={index} className='border p-1'>
                                <div className="align-items-center">
                                    <p className='form-control m-1 text-center small p-1'>{attribute.name}</p>
                                    <input type="number" className="form-control m-1 p-1 text-center" placeholder={attribute.name} value={attribute.value} onChange={(e) => attribute.setValue(e.target.value)} />
                                    <input type="number" className='form-control m-1 p-1 text-center' placeholder='Bonus' value={attribute.bonus} onChange={(e) => attribute.setBonus(e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='border p-1'>
                            <input type="text" style={{maxWidth:'50px'}} />
                            <label className='form-check-label ms-5 small'>Inspiration</label>    
                        </div>
                        <div className='border p-1'>
                            <input type="text" style={{maxWidth:'50px'}} />
                            <label className='form-check-label ms-5 small'>Proficiency Bonus</label>        
                        </div>
                        <div className='small text-center border p-1'>Saving Throws
                            {attributeName.map((attr, idx) => (
                                <div key={idx} className='d-flex align-items-center border-bottom'>
                                    <input type="checkbox" className="form-check-input bg-dark"/>
                                    <input type="number" className='form-control m-1' style={{maxHeight:'30px', maxWidth:'50px', fontSize:'14px'}} />
                                    <div className='small'>{attr}</div>
                                </div>
                            ))}
                        </div>
                        <div className='small text-center border p-1'>Skills
                            {skills.map((skill, idx) => (
                                <div key={idx} className='d-flex align-items-center border-bottom'>
                                    <input type="checkbox" className="form-check-input bg-dark"/>
                                    <input type="number" className='form-control m-1' style={{maxHeight:'30px', maxWidth:'50px', fontSize:'14px'}} />
                                    <div className='small'>{skill}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                    <div className="border p-1">
                        <p>Passive Wisdom (Perception)</p>
                    </div>
                    <div>
                        <p>Other Proficiencies & Languages</p>
                    </div>
                </div>
            <div>
        </div>

        
        </>
    );
}
    
export default CharSheetPageOneLeft