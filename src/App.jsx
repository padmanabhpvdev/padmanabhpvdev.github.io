import { useState } from 'react'
import './App.css'
import Navbar, { Footer } from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'
import About from './components/About'
import Contact from './components/Contact'
import BlogPost from './components/BlogPost'
import Radios from './components/Radio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog/>}>

        </Route>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path='/radios' element={<Radios/>}/>
        <Route path='/about' element={<About/>}/>
        {/* <Route path='/contact' element={<Contact/>}/> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
