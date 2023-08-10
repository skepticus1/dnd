import { useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx'


export default function LogoutPage() {
    const { logout } = useUser();

    useEffect(() => {
        logout();
    }, [])
    


    return (
        <>
            <h2>Logout Page</h2>
        </>
    )
}