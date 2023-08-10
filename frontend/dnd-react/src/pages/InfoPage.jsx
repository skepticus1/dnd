import { useUser } from '../context/UserContext.jsx'


export default function InfoPage() {
    const { user } = useUser();

    return (
        <>
            <h2>User Information</h2>
            {user && (
                <ul>
                    {Object.entries(user).map(([key, value]) => (
                        <li key={key}>
                            {key}:{value}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}