import { useUser } from '../context/UserContext.jsx'


export default function InfoPage() {
    const { user } = useUser();

    return (
        <>
            <div className='img_background'>
                <div style={{height: "75px"}}></div>

                <div className='container'>
                    <div className="row justify-content-center">
                        {/* User Information Card */}
                        <div className="col-md-6 mb-3">
                            <div className="card bg-secondary text-white">
                                <div className="card-header bg-dark">
                                    User Information
                                </div>
                                <div className="card-body">
                                    {user && (
                                        <ul className="list-unstyled">
                                            {Object.entries(user).map(([key, value]) => (
                                                <li key={key}>
                                                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}