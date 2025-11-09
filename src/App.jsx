import { useEffect, useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'
import Splash from './components/Splash'

function App() {
  const [showSplash, setShowSplash]=useState(true);
  useEffect(()=>{
    const timer = setTimeout(()=>{setShowSplash(false)},8500)
    return () => clearTimeout(timer)
  },[])
  return (
      <>

        {showSplash ? (<Splash/>):(<MainPage/>)}
      </>
  )
}

export default App
