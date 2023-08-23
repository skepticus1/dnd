import { useCharacter } from "../context/CharContext";
import { useCreation } from "../context/CreationContext";

const CharSheetAttributes = () => {
    const {charData, setCharData} = useCharacter()
    const {races, raceData} = useCreation()

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

    return (
        <>
            <div className="">
                <div className="text-center"><strong>Attributes</strong></div>
                <div className="row">
                        {attributes.map((attribute, index) => (
                            <div key={index} className='col mb-3'>
                                <div className="row align-items-center">
                                    <div className="col-6 text-right">
                                        {attribute.name}
                                    </div>
                                    <div className="col-6">
                                        <input 
                                            type="number" 
                                            className="form-control text-center" 
                                            placeholder={attribute.name} 
                                            value={charData[attribute.key + "Value"] || 0}
                                            onChange={(e) => handleAttributeChange(e, attribute.key)} 
                                        />
                                    </div>
                                    <div className="col-12 text-left">
                                        {` + ${getRaceAttributeBonus(attribute.key)}` || 0 }
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6 text-right">
                                        Bonus:
                                    </div>
                                    <div className='col-6'>
                                        {charData[attribute.key + "Bonus"] || 0}
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