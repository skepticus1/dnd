import { useUser } from '../context/UserContext.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function InfoPage() {
    const navigate = useNavigate()
    const { backendURL, user, setUser } = useUser();
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    })
    
    // auth details
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    }

    useEffect(() => {
        if (user) {
            setEditData({
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            })
        }
    }, [user])

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(`${backendURL}users/info/`, editData, config)
            setUser(response.data)
            setIsEditing(false);
            navigate('/')
        } catch (error) {
            console.error('error updating user: ', error)
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${backendURL}users/info/`, config)
            setUser(null)
            navigate('/')
        } catch (error) {
            console.error('error deleting user:', error)
        }
    }

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
                                        <>
                                            {isEditing ? (
                                                <div className='row'>
                                                    <div className='col-5'>
                                                        <label className='mb-2'>First Name: </label>
                                                    </div>
                                                    <div className='col-7'>
                                                        <input
                                                            className='form-control mb-2'
                                                            value={editData.first_name}
                                                            placeholder='First Name'
                                                            onChange={(e) => setEditData({ ...editData, first_name: e.target.value})}
                                                        />

                                                    </div>
                                                    <div className='col-5'>
                                                        <label className='mb-2'>Last Name: </label>
                                                    </div>
                                                    <div className='col-7'>    
                                                        <input
                                                            className='form-control mb-2'
                                                            value={editData.last_name}
                                                            placeholder='Last Name'
                                                            onChange={(e) => setEditData({ ...editData, last_name: e.target.value})}
                                                        />

                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <button className='btn btn-dark mb-1' onClick={handleSave}>Save</button>
                                                        <button className='btn btn-secondary' onClick={() => setIsEditing(false)}>Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className=''>
                                                    <ul className="list-unstyled mb-5">
                                                    {Object.entries(user).map(([key, value]) => (
                                                        <li key={key}>
                                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                    <div className='d-flex justify-content-between'>
                                                        <button className='btn btn-dark mr-2' onClick={handleEdit}>Edit</button>
                                                        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>    
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