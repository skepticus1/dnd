import { useCharacter } from "../context/CharContext";

const CharSheetAttributes = () => {
    const char = useCharacter()

    const attributes = [
        { name: 'STR', value: char.strValue, bonus: char.strBonus, setValue: char.setStrValue, setBonus: char.setStrBonus },
        { name: 'DEX', value: char.dexValue, bonus: char.dexBonus, setValue: char.setDexValue, setBonus: char.setDexBonus },
        { name: 'CON', value: char.conValue, bonus: char.conBonus, setValue: char.setConValue, setBonus: char.setConBonus },
        { name: 'INT', value: char.intValue, bonus: char.intBonus, setValue: char.setIntValue, setBonus: char.setIntBonus },
        { name: 'WIS', value: char.wisValue, bonus: char.wisBonus, setValue: char.setWisValue, setBonus: char.setWisBonus },
        { name: 'CHA', value: char.chaValue, bonus: char.chaBonus, setValue: char.setChaValue, setBonus: char.setChaBonus },
    ];
    


    const handleAttributeChange = (e, attribute) => {
        const newValue = e.target.value;
        attribute.setValue(newValue)

        const bonus = Math.floor((newValue - 10) / 2 )
        attribute.setBonus(bonus)
    }



    return (
        <>
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
                                        value={attribute.value}
                                        onChange={(e) => handleAttributeChange(e, attribute)} 
                                    />
                                </div>
                                <div className="d-flex">
                                    <label className='text-center m-2'>Bonus</label>
                                    <div className='form-control text-center p-1'>
                                        {attribute.bonus}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
    
export default CharSheetAttributes