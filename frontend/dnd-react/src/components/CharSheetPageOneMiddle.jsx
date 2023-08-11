import { useCharacter } from "../context/CharContext";

const CharSheetPageOneMiddle = () => {
    

    return (
        <>
            <div className='d-flex'>
                <input type="number" className="form-control mb-2" placeholder="Armor Class" />
                <p>Initiative</p>
                <p>Speed</p>
            </div>
            <div>
                <p>max hit points</p>
                <p>current hitpoints</p>
            </div>
            <div className='d-flex'>
                <p>hit dice</p>
                <p>death saves</p>
            </div>
            <div className='d-flex'>
                <p className='border-bottom p-1'>name</p>
                <p className='border-bottom p-1'>atk bonus</p>
                <p className='border-bottom p-1'>damage/type</p>
            </div>
            <div>
                <p>drop down list of attacks</p>
                <p>or auto populate by damage amount</p>
            </div>
            <div className="d-flex">
                <div>
                    <p>CP</p>
                    <p>SP</p>
                    <p>EP</p>
                    <p>GP</p>
                    <p>PP</p>
                </div>
                <div>
                    <p>Equipment</p>
                </div>
            </div>
        
        </>
    )

}

export default CharSheetPageOneMiddle












