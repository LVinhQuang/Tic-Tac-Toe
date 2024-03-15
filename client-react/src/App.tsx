import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import useUserStore from './stores/UserStore'

function App() {
  const {isInitialized, isLoggedIn,user,setUserDetails} = useUserStore() as { isInitialized: boolean, setUserDetails: Function, isLoggedIn: boolean, user: object };
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/login" element={isLoggedIn===false ? <Login /> : <Navigate to='/'/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}

export default App
