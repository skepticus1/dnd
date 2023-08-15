import { createContext, useState, useContext, useEffect } from "react";

const CreationContext = createContext()

export const useCreation = () => {
    return useContext(CreationContext)
}

export const CreationProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);
    const [alignments, setAlignments] = useState([])
    const [backgrounds, setBackgrounds] = useState([])

    const value = {
        classes, setClasses,
        races, setRaces,
        alignments, setAlignments,
        backgrounds, setBackgrounds,
    }


    return (
        <CreationContext.Provider value={value}>
            {children}
        </CreationContext.Provider>
    )
}