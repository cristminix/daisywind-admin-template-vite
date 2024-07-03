import React, { lazy, useEffect, useRef,useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import {isTokenExpired} from "./global/fn/isTokenExpired"
import {getJwtToken,getRefreshToken,setJwtToken,setRefreshToken,updateToken} from "./global/auth"
// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {
  const timerRef = useRef(null)
  const skipThickRef = useRef(false)
  const timeInterval = 5000
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  const onTimerThick = async()=>{
    let token,refreshToken,tokenExpired,refreshTokenExpired
    token = getJwtToken()

    if(!token){
      console.log(`token is null, are you login`)
      return
    }
    tokenExpired = isTokenExpired(token)

    refreshToken = getRefreshToken()
    if(!refreshToken){
      console.log(`refresh token is null, are you login`)
      return
    }
    refreshTokenExpired = isTokenExpired(refreshToken)
    const date=new Date()
    // console.log({token,refreshToken,date,tokenExpired,refreshTokenExpired})
    if(refreshTokenExpired){
      console.log(`refresh token expired logout`)
    }
    if(tokenExpired){
      skipThickRef.current = true
      console.log(`updating token`)
      const result = await updateToken()
      console.log(result)
      skipThickRef.current = false
    }
  }
  const createTimer = ()=>{
    timerRef.current = setInterval(()=>{
      if(!skipThickRef.current)
        onTimerThick()
      else
        console.log(`onTimerThick skipped ...`)
    },timeInterval)
  }
  const stopTimer = ()=>{
    clearInterval(timerRef.current)
  }
  useEffect(()=>{
    // if(timerStarted)
      createTimer()
    // else
      // stopTimer()
    return ()=>stopTimer()
  },[])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
