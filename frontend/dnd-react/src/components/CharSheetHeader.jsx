import { useCharacter } from "../context/CharContext";
import { useCreation } from "../context/CreationContext";
import { useEffect } from "react";


const CharSheetHeader = () => {
    const { charData, setCharData, updateCharData } = useCharacter()

    //console.log(useCharacter())
   
    const {
        classes, setClasses,
        races, setRaces,
        alignments, setAlignments,
        backgrounds, setBackgrounds
    } = useCreation()


    // get class data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes/')
            .then(response => response.json())
            .then(data => {
                setClasses(data.results);
            })
            .catch(error => {
                console.error('error fetching classes: ', error);
            })
    }, [setClasses])

    // handle class change
    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        updateCharData('charClass', selectedClass)
    }
    

    // get race data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races/')
            .then(response => response.json())
            .then(data => {
                setRaces(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setRaces])

    // handle race change
    const handleRaceChange = (event) => {
        const selectedRace = event.target.value;
        updateCharData('race', selectedRace)
    }

    // get alignment data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/alignments/')
            .then(response => response.json())
            .then(data => {
                setAlignments(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setAlignments])

    // handle alignment change
    const handleAlignmentChange = (event) => {
        const selectedAlignment = event.target.value;
        updateCharData('alignment', selectedAlignment)
    }
   

    // get background data from dndapi
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/backgrounds/')
            .then(response => response.json())
            .then(data => {
                setBackgrounds(data.results);
            })
            .catch(error => {
                console.error('error fetching races: ', error);
            })
    }, [setBackgrounds])

    // handle background change
    const handleBackgroundChange = (event) => {
        const selectedBackground = event.target.value;
        updateCharData('background', selectedBackground)
    }

    return (

        <div className="border p-1">
            <div className="row m-1">
                <div className="col-md-4">
                    <label htmlFor="charName" className="small text-center d-block">Name</label>
                    <input
                        id='charName'
                        type="text" 
                        className="form-control mb-2"
                        placeholder="Character Name"
                        value={charData.charName || ''}
                        onChange={(e) => updateCharData('charName', e.target.value)}
                    />
                    <label htmlFor="background" className="small text-center d-block">Background</label>
                    <select className="form-control" value={charData.background || ''} onChange={handleBackgroundChange}>
                        <option className="text-center" value="">... select ...</option>
                        {backgrounds.map(background => (
                            <option key={background.index} value={background.index}>
                                {background.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="characterClass" className="small text-center d-block">Class</label>
                    <select className="form-control" value={charData.charClass || ""} onChange={handleClassChange}>
                        <option className="text-center" value="">... select ...</option>
                        {classes.map(cls => (
                            <option key={cls.index} value={cls.index}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="playerName" className="small text-center d-block">Player</label>
                    <input 
                        id='playerName'
                        type="text" 
                        className="form-control" 
                        placeholder="Player Name"
                        value={charData.userName || ''}
                        onChange={(e) => updateCharData('userName', e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="race" className="small text-center d-block">Race</label>
                    <select className="form-control" value={charData.race || ""} onChange={handleRaceChange}>
                        <option className="text-center" value="">... select ...</option>
                        {races.map(race => (
                            <option key={race.index} value={race.index}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="alignment" className="small text-center d-block">Alignment</label>
                    <select className="form-control" value={charData.alignment || ""} onChange={handleAlignmentChange}>
                        <option className="text-center" value="">... select ...</option>
                        {alignments.map(alignment => (
                            <option key={alignment.index} value={alignment.index}>
                                {alignment.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default CharSheetHeader