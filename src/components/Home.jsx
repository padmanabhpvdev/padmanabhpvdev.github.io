import {  FaC, FaFlutter, FaRaspberryPi } from 'react-icons/fa6';
import './main.css';
import { DiGit, DiHtml5, DiJava, DiJsBadge, DiLinux, DiMysql, DiPhp, DiPython, DiReact, DiSqllite } from 'react-icons/di';
import { SiArduino, SiDolby } from 'react-icons/si';
import { LuCircuitBoard } from 'react-icons/lu';
import me from '../assets/me.jpg'
import { Link } from 'react-router-dom';
import Social from './Social';
function Home(){
    const skillsData = [
        { id: 1, icon: <DiPython color='#3776AB'/>, name: 'Python',url:'https://www.python.org'},
        { id: 2, icon: <DiJsBadge color='#f7df1eff'/>, name: 'JavaScript',url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { id: 3, icon: <DiHtml5 color='#E34F26'/>, name: 'HTML5',url:'https://html.com/html5' },
        { id: 4, icon: <FaC color='#78b7ffff'/>, name: 'C Programming',url:'https://www.c-language.org/' },
        { id: 5, icon: <DiReact color='#61DAFB'/>, name: 'React',url:'https://react.dev'},
        { id: 6, icon: <DiPhp color='#777BB4'/>, name: 'PHP' ,url:'https://www.php.net'},
        { id: 7, icon: <FaFlutter color='#02569B'/>, name: 'Flutter',url:'https://flutter.dev'},
        { id: 8, icon: <DiJava color='#007396'/>, name: 'Java' ,url:'https://www.java.com'},
        { id: 9, icon: <DiLinux color='#02858fff'/>, name: 'Linux' ,url:'https://www.linux.org/'},
        { id: 10, icon: <DiSqllite color='#003B57'/>, name: 'SQLite' ,url:'https://sqlite.org'},
        { id: 11, icon: <DiGit color='#F05032'/>, name: 'Git' ,url:'https://git-scm.com/'},
        { id: 12, icon: <DiMysql color='#4479A1'/>, name: 'MySQL' ,url:'https://www.mysql.com/'},
        { id: 13, icon: <FaRaspberryPi color='#C51A4A'/>, name: 'Raspberry Pi',url:'https://www.raspberrypi.com'},
        { id: 14, icon: <SiArduino color='#00979D'/>, name: 'Arduino',url:'https://arduino.cc'},
        { id: 15, icon: <LuCircuitBoard color='#8A2BE2'/>, name: 'Circuit Design' ,url:'https://duckduckgo.com/search?q=circuit+design'},
        { id: 16, icon: <SiDolby color='#cdf7f8ff'/>, name: 'Dolby',url:'https://www.dolby.com/en-in/technologies/dolby-atmos/'},
    ];
    return(
        <div className="container-fluid py-2">
            <div className="container py-4 justify-content-center align-items-center text-center">
                <img src={me} width="150" height="150" alt="" className="avatar"/>
                <div className="bio">
                    <h2>Padmanabh P V</h2>
                    <small>Computer, Electronics and more...</small>
                </div>
                <Social/>
                {/* <div className="py-3">
                    <Link to="/project" className='mybtn'>Explore My Projects <span className='arrow fs-5'>→</span></Link>
                </div> */}
            </div>
            <div className="container-fluid py-3">
                <h3 className="text-center">My Skills</h3>
                <div className="container-fluid py-4">
                    <div className="main-container">
                        <div className="cards-container">
                            {skillsData.map((skills)=>
                            <a href={skills.url} target='_blank'>
                            <div className="cards" key={`original-${skills.id}`}>
                                {skills.icon}
                            </div></a>
                            )}
                            {skillsData.map((skills)=>
                            <a href={skills.url} target='_blank'>
                            <div className="cards" key={`original-${skills.id}`}>
                                {skills.icon}
                            </div></a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;