import { createContext, useContext, useState } from "react";
//import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    //const navigate = useNavigate()
    const [user, setUser] = useState(null);

    const backendURL = "http://127.0.0.1:8000/api/" 

    const logout = () => {
        setUser(null);
    //    navigate('/')
    }

    return (
        <>
            <UserContext.Provider value={{user, setUser, logout, backendURL}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useUser = () => useContext(UserContext)