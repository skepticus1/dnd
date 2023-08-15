import { useCharacter } from "../context/CharContext";

const CharSheetSavingHitDice = () => {

    // characters attributes and set method.
    const char = useCharacter()

    const savingThrowValues = {
        "Strength" : char.strSaving,
        "Dexterity" : char.dexSaving,
        "Constitution" : char.conSaving,
        "Intelligence" : char.intSaving,
        "Wisdom" : char.wisSaving,
        "Charisma" : char.chaSaving,
    }

    return (
        <>
            <div className="small text-center">
                Saving Throws and Hit Dice
                <div className="row border p-1">
                    <div className="col-md-4">
                        <strong>Saving Throws</strong>
                        {Object.keys(savingThrowValues).map((key) => (
                            <div className="d-flex" key={key}>
                                <div className="mr-2">
                                    <input type="checkbox" />
                                </div>
                                <div className="d-flex justify-content-between" style={{width: '100px'}}>
                                    <div>{key}</div>
                                    <div>{savingThrowValues[key]}</div>
                                </div>
                            </div>
                        ))}
                        <div>Inspiration</div>
                        <div>Proficiency Bonus</div>
                    </div>

                    
                    <div className="col-md-8">
                        <div className="">
                            Armor Class
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
export default CharSheetSavingHitDice