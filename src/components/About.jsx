import { useEffect } from "react";

export default function About(){
    useEffect(()=>{
        document.title="About Me ● Padmanabh's Blog";
      },[]);
    return(
        <section className="container-fluid p-3">
            <div className="container mt-3">
                <h2 className="text-center fw-bold">About <span className="text-primary">Me</span></h2>
                <p className="text-center text-muted">Computer Programmer | Electronics | Fitness | Sound Engineer</p>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src="https://padmanabhpvdev.github.io/assets/me-BK2XX3zs.jpg" alt="Padmanabh P V" width="250" className="rounded-circle" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="fw-bold text-center">Hello, I'm <span className="text-primary">Padmanabh P V</span></h3>
                        <p style={{textAlign:'justify'}}>I'm Padmanabh P V, a 21-year-old self-taught computer programmer, software and web developer and sound engineer passionate about creating innovative solutions that blend technology and creativity. I have strong skills in programming, web and app development, and I love exploring new tools to push the boundaries of what’s possible. Alongside coding, I’m deeply interested in sound engineering, experimenting with audio mixing, mastering and custom hardware-driven sound systems. When I’m not working on tech or sound, I enjoy tinkering with electronics like microcontrollers and circuit boards, and I’m also a fitness enthusiast who believes that physical strength fuels mental clarity and innovation.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h2 className="text-center fw-bold">Education <span className="text-primary">Details</span></h2>
                <div className="row mt-3 g-4">
                    <div className="col-md-4">
                        <a href="https://kairalividyabhavan.com/" target="_blank" className="card h-100 border-0 shadow">
                            <div className="card-body text-center">
                                <h2 className="fa fa-school"></h2>
                                <h4 className="fw-bold mt-3">Amrita Kairali Vidya Bhavan, Nedumangad</h4>
                                <strong className="text-success">Basic Schooling</strong>
                            </div>
                            <div className="card-footer">
                                <p className="text-muted text-center">School | 2012-2022</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="https://mcas.ac.in" target="_blank" className="card h-100 border-0 shadow">
                            <div className="card-body text-center">
                                <h2 className="fa fa-graduation-cap"></h2>
                                <h4 className="fw-bold mt-3">Marian College of Arts & Science</h4>
                                <strong className="text-success">Bachelors Degree in Computer Science</strong>
                            </div>
                            <div className="card-footer">
                                <p className="text-muted text-center">College | 2022-2025</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="https://dcsku.org" target="_blank" className="card h-100 border-0 shadow">
                            <div className="card-body text-center">
                                <h2 className="fa fa-university"></h2>
                                <h4 className="fw-bold mt-3">University of Kerala, Karyavattom</h4>
                                <strong className="text-danger">Masters Degree in Computer Science</strong>
                            </div>
                            <div className="card-footer">
                                <p className="text-muted text-center">University | 2025-present</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}