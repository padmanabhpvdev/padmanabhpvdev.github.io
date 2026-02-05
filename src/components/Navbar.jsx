import './Sample.css'
import React, { useEffect } from 'react';
import {useBootstrapTooltips} from './Tooltip';

export default function Navbar(){
    useBootstrapTooltips();
    const currentPath = window.location.pathname;
    const isActive = (path)=>{
        return currentPath===path?'active':'';
    }
    return(
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow-lg">
            <div className="container">
                <a href="/" className="navbar-brand">
                    padmanabh p v
                </a>
                <button className="navbar-toggler shadow-none outline-none border-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="fs-2"><i className="fas fa-bars"></i></span>
                </button>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button className="btn-close text-start" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 text-uppercase fw-bold hoverfx">
                            <li className="nav-item">
                                <a href="/" className={`nav-link ${isActive('/')}`}><i className="fa fa-home"></i> Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="/blog" className={`nav-link ${isActive('/blog')}`}><i className="fa fa-blog"></i> Blogs</a>
                            </li>
                            <li className="nav-item">
                                <a href="/radios" className={`nav-link ${isActive('/radios')}`}><i className="fa fa-radio"></i> Radios</a>
                            </li>
                            <li className="nav-item">
                                <a href="/about" className={`nav-link ${isActive('/about')}`}><i className="fa fa-bullseye"></i> About Me</a>
                            </li>
                            {/* <li className="nav-item">
                                <a href="/contact" className={`nav-link ${isActive('/contact')}`}><i className="fa fa-phone"></i> Contact</a>
                            </li> */}
                        </ul>
                        <ul className="nav d-flex fs-6 hoverfx2">
                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="bottom" data-bs-title="Email <br><small><em>padmanabhpv2k04@gmail.com</em></small>">
                                <a href="mailto:padmanabhpv2k04@gmail.com" target='_blank' className="nav-link text-primary"><i className="fa fa-envelope"></i></a>
                            </li>
                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Whatsapp <br><small><em>+918590343473</em></small>" data-bs-placement="bottom">
                                <a href="https://wa.me/+918590343473" target='_blank' className="nav-link text-success"><i className="fab fa-whatsapp"></i></a>
                            </li>
                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Instagram <br><small><em>@padmanabh.in</em></small>" data-bs-placement="bottom">
                                <a href="https://instagram.com/padmanabh.in" target='_blank' className="nav-link text-danger"><i className="fab fa-instagram"></i></a>
                            </li>
                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Github <br><small><em>@padmanabhpvdev</em></small>" data-bs-placement="bottom">
                                <a href="https://github.com/padmanabhpvdev" target='_blank' className="nav-link text-dark"><i className="fab fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}


export function Footer() {
    const currentYear = new Date().getFullYear;


    return (
        <footer className="bg-light text-dark pt-4 pb-3 shadow-lg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h5 className="fw-bold">
                            <i className="fas fa-heart me-2"></i>
                            Padmanabh P V
                        </h5>
                        <p className="small mb-3">
                            Something else, but evolving...
                        </p>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="badge bg-primary">Computer Programmer</span>
                            <span className="badge bg-success">Electronics</span>
                            <span className="badge bg-info">Sound Engineer</span>
                            <span className="badge bg-warning">Fitness</span>
                        </div>
                    </div>
                    <div className="col-lg-2 mb-4 mb-lg-0">
                        <h6 className="fw-bold text-uppercase mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="/" className={`text-decoration-none text-dark`}>
                                    <i className="fas fa-home me-2"></i>
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/blog" className={`text-decoration-none text-dark`}>
                                    <i className="fas fa-blog me-2"></i>
                                    Blogs
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/radios" className={`text-decoration-none text-dark`}>
                                    <i className="fas fa-radio me-2"></i>
                                    Radios
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className={`text-decoration-none text-dark`}>
                                    <i className="fas fa-bullseye me-2"></i>
                                    About Me
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="fw-bold text-uppercase mb-3">Connect With Me</h6>
                        <div className="d-flex gap-3 mb-3 hoverfx2">
                            <a href="mailto:padmanabhpv2k04@gmail.com" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-primary fs-5">
                                <i className="fas fa-envelope"></i>
                            </a>
                            <a href="https://wa.me/+918590343473" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-success fs-5">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href="https://instagram.com/padmanabh.in" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-danger fs-5">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://github.com/padmanabhpvdev" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-dark fs-5">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                        
                        <div className="mb-2">
                            <small>
                                <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                                Trivandrum, Kerala, India
                            </small>
                        </div>
                        <div>
                            <small>
                                <i className="fas fa-phone me-2 text-muted"></i>
                                +91 8590343473
                            </small>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 pt-3 border-top">
                    <div className="col-md-6">
                        <p className="mb-0 small">
                            <i className="far fa-copyright me-1"></i>
                            {currentYear} Padmanabh P V. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 small text-muted">
                            Built with <i className="fas fa-heart text-danger"></i> using ReactJS & Bootstrap
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}