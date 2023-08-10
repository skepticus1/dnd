import { useUser } from '../context/UserContext.jsx'

export default function HomePage() {
    const { user } = useUser()

    return (
        <>
            <h2>Home Page</h2>
            {user ? (
                <p>Welcome, {user.username}</p>
            ) : (
                <p>Error, didn't get user data</p>
            )}
            
        </>
    )
}