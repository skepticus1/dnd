import { useCharacter } from "../context/CharContext";


const CharSheetPageOneHeader = () => {
    const {
        characterName, setCharacterName,
        background, setBackground,
        characterClass, setCharacterClass,
        playerName, setPlayerName,
        race, setRace,
        alignment, setAlignment,
    } = useCharacter()

    return (

        <div className="row mb-3">
            <div className="col-md-4">
                <div className='border p-2'>
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Character Name"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Background"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <div className='border p-2'>
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Class"
                        value={characterClass}
                        onChange={(e) => setCharacterClass(e.target.value)}
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Player Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <div className='border p-2'>
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Race"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Alignment"
                        value={alignment}
                        onChange={(e) => setAlignment(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CharSheetPageOneHeader