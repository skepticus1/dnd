import axios from "axios";
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
        backgrounds, setBackgrounds,
        raceData, setRaceData,
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

        if(selectedRace) {
            axios.get(`https://www.dnd5eapi.co/api/races/${selectedRace}`)
                .then(response => {
                    const raceDetails = response.data
                    updateCharData('speed', raceDetails.speed)
                    updateCharData('size', raceDetails.size)
                    setRaceData(raceDetails)
                })
                .catch(error => {
                    console.error('There was an eroor fetching the race details:', error)
                })
        }

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

        <div className="border">
            <div className="row">
                <div className="col-md-4">
                    img
                </div>
                <div className="col-md-4">
                    <label htmlFor="age" className="small text-center d-block">Age</label>
                    <input 
                        id='age'
                        type="number" 
                        className="form-control" 
                        placeholder="Age"
                        value={charData.age || ''}
                        onChange={(e) => updateCharData('age', e.target.value)}
                    />
                    <label htmlFor="height" className="small text-center d-block">Height</label>
                    <input 
                        id='height'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Height"
                        value={charData.height || ''}
                        onChange={(e) => updateCharData('height', e.target.value)}
                    />
                    <label htmlFor="weight" className="small text-center d-block">Weight</label>
                    <input 
                        id='weight'
                        type="number" 
                        className="form-control" 
                        placeholder="Character Weight"
                        value={charData.weight || ''}
                        onChange={(e) => updateCharData('weight', e.target.value)}
                    />
                    <label htmlFor="eyes" className="small text-center d-block">Eyes</label>
                    <input 
                        id='eyes'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Eye"
                        value={charData.eyes || ''}
                        onChange={(e) => updateCharData('eyes', e.target.value)}
                    />
                    <label htmlFor="skin" className="small text-center d-block">Skin</label>
                    <input 
                        id='skin'
                        type="test" 
                        className="form-control" 
                        placeholder="Character Skin"
                        value={charData.skin || ''}
                        onChange={(e) => updateCharData('skin', e.target.value)}
                    />
                    <label htmlFor="hair" className="small text-center d-block">Hair</label>
                    <input 
                        id='hair'
                        type="text" 
                        className="form-control" 
                        placeholder="Character Hair"
                        value={charData.hair || ''}
                        onChange={(e) => updateCharData('hair', e.target.value)}
                    />
                </div>
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
                    <label htmlFor="characterClass" className="small text-center d-block">Class</label>
                    <select className="form-control" value={charData.charClass || ""} onChange={handleClassChange}>
                        <option className="text-center" value="">... select ...</option>
                        {classes.map(cls => (
                            <option key={cls.index} value={cls.index}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="level" className="small text-center d-block">Level</label>
                    <input 
                        id='level'
                        type="number" 
                        className="form-control" 
                        placeholder="Character Level"
                        value={charData.level || ''}
                        onChange={(e) => updateCharData('level', e.target.value)}
                    />
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