import './App.scss'
import Dashboard from './screens/Dashboard'
import Home from './screens/Home'
import Onboarding from './screens/Onboarding'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useCookies } from 'react-cookie'
import Profile from './screens/Profile';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies<string>(['user'])

  const authToken = cookies.AuthToken;

  return (
    <>
        <BrowserRouter>
          <Routes>
            {/* {!authToken && <Route path='/*' element={<Navigate to='/' replace />} />} */}
            <Route path='/' element={<Home />} />
            {authToken && <Route path='/dashboard' element={<Dashboard />} />}
            {authToken && <Route path='/onboarding' element={<Onboarding />} />}
            {authToken && <Route path='/profile' element={<Profile />} />}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
