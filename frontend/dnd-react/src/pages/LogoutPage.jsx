import { useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx'


export default function LogoutPage() {
    const { logout } = useUser();

    useEffect(() => {
        logout();
    }, [])
    


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
                                    Successfuly Logged Out
                                </div>
                                <div className="card-body">
                                    Thanks for visiting!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}