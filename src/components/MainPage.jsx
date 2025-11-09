import { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './main.css';
import Home from './Home';
import Projects from './Projects';
import About from './About';
import Footer from './Footer';

function MainPage(){
    return(
        <Router>
            <div className='bg container-fluid'>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default MainPage;