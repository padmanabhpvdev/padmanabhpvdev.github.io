import { FaBaby, FaGraduationCap, FaSchool, FaStairs } from "react-icons/fa6";
import Social from "./Social";
import { FaUniversity } from "react-icons/fa";

function About(){
    return(
        <div className="container-fluid py-3" style={{fontSize: '1.1em'}}>
            <div className="container-sm">
                <h2 className="fw-bold">About Me</h2>
                <h4 className="py-2">Hi, I'm <strong>Padmanabh P V</strong></h4>
                <ul className="interests">
                    <li>Computer Programmer</li>
                    <li>Electronics</li>
                    <li>App/Web Developer</li>
                    <li>Sound Engineer</li>
                    <li>Fitness Enthusiast</li>
                </ul>
                <p className="py-3" style={{textAlign:'justify'}}>I'm Padmanabh P V, a 21-year-old self-taught computer programmer, software and web developer and sound engineer passionate about creating innovative solutions that blend technology and creativity. I have strong skills in programming, web and app development, and I love exploring new tools to push the boundaries of what’s possible. Alongside coding, I’m deeply interested in sound engineering, experimenting with audio mixing, mastering and custom hardware-driven sound systems. When I’m not working on tech or sound, I enjoy tinkering with electronics like microcontrollers and circuit boards, and I’m also a fitness enthusiast who believes that physical strength fuels mental clarity and innovation.</p>
                <h5>I'm available online :</h5><Social/>
            </div>
            <div className="container py-3">
                <p><FaSchool className="mb-1"/> <strong>Alma Mater</strong> : <a className="link" target="_blank" href="https://kairalividyabhavan.com/">Amrita Kairal Vidya Bhavan, Nedumangad</a></p>
                <p><FaUniversity className="mb-1"/> <strong>Education</strong> : <a className="link" target="_blank" href="https://mcas.ac.in">Marian College of Arts & Science, Menamkulam</a></p>
                <p><FaGraduationCap className="mb-1"/> <strong>Qualification</strong> : <a className="link" target="_blank" href="https://www.keralauniversity.ac.in/programmes">Bachelor's in Computer Science</a></p>
                <p><FaStairs className="mb-1"/> Currently pursuing Masters in Computer Science at <a className="link" target="_blank" href="https://dcsku.org">Department of Computer Science, University of Kerala, Karyavattom Campus</a></p>
            </div>
        </div>
    )
}
export default About;