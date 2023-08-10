import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { useEffect } from 'react'
import { api } from "./utilities";
import { useUser } from './context/UserContext'


export default function App() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    whoAmI()
  }, [])

  const whoAmI = async () => {
    let token = localStorage.getItem('token')
    if(token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get('users/')
      setUser(response.data)
      navigate('/')
    }else{
      setUser(null)
      navigate('login')
    }
  }

  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
      </UserProvider>
    </>
  )
}