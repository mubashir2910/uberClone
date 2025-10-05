import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import { FareProvider } from './context/FareContext'
import { VehicleTypeProvider } from './context/VehicleTypeContext'
import CaptainContext from './context/CaptainContext'

const App = () => {
  return (
    <div>
      <FareProvider>
        <VehicleTypeProvider>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/users/register' element={<UserSignup/>}/>
        <Route path='/users/login' element={<UserLogin/>}/>
        <Route path='/captains/register' element={<CaptainSignup/>}/>
        <Route path='/captains/login' element={<CaptainLogin/>}/>
        <Route path='/home' element={
          <UserProtectedWrapper><Home/></UserProtectedWrapper>
          }/>
        <Route path='/users/logout' element={
          <UserProtectedWrapper><UserLogout/></UserProtectedWrapper>
          }/>
        <Route path='/captains/home' element={
          <CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>
          }/>
        <Route path='/captains/logout' element={
          <CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>
          }/>
        <Route path='/riding' element={
          <UserProtectedWrapper><Riding/></UserProtectedWrapper>
          }/>
        <Route path="/captains/riding" element={
          <CaptainProtectedWrapper><CaptainRiding/></CaptainProtectedWrapper>
        }/>
      </Routes> 
      </VehicleTypeProvider>
      </FareProvider>
    </div>
  )
}

export default App

