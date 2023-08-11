import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { api } from "./utilities";
import { useUser } from "./context/UserContext"
import { CharacterProvider } from "./context/CharContext";


export default function App() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    whoAmI()
  }, [])

  const whoAmI = async () => {
    let token = localStorage.getItem('token')
    try {
      if(token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await api.get('users/info/')
        setUser(response.data)
        navigate('/')
      }else{
        setUser(null)
        navigate('login')
      }
    }
    catch{
      setUser(null)
      navigate('login')
    }
    
  }

  return (
    <>
      <CharacterProvider>
          <Navbar />
          <Outlet />
      </CharacterProvider>
    </>
  )
}