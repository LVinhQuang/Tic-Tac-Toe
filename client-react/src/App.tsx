import {Routes, Route, Navigate} from 'react-router-dom'
import useUserStore from './stores/UserStore'
import { useEffect } from 'react'
import axios from 'axios'
import { GOOGLE_API } from './backendkey'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { CaroWeb } from './CaroWeb'
import Signup from './pages/Signup'

function App() {
  const {isInitialized, isLoggedIn,user,setUserDetails} = useUserStore() as { isInitialized: boolean, setUserDetails: Function, isLoggedIn: boolean, user: object };
  useEffect(() => {
    const getUser = async () => {
      axios.get(GOOGLE_API+'/success', {withCredentials: true})
      .then((response) => {
        switch(response.status) {
         case 200:
          setUserDetails({ isLoggedIn: true, user: response.data.user, isInRoom: '' });
          break;
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
    getUser();
  },[])
  return (
    <>
      <Routes>
        {
          isLoggedIn && 
          <>
            <Route path='*' element={<CaroWeb/>} />
          </>
        }
        {
          !isLoggedIn &&
          <>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='*' element={<Navigate to="/login" />}/>
          </>
        }
      </Routes>
    </>
  )
}

export default App
