import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);


    const logout = () => {
        setUser(null);
        navigate('/')
    }

    return (
        <>
            <UserContext.Provider value={{user, setUser, logout}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useUser = () => useContext(UserContext)