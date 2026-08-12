"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import { useState, useEffect } from 'react';

export const NavBar = () => {

    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 50){
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        
        return () => window.removeEventListener("Scroll", onScroll);
    }, []);

    return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">Kadir.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mx-lg-auto align-items-end align-items-lg-center gap-2">
            <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('about')}>A propos</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('skills')}>Compétences</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('projects')}>Projets</Nav.Link>
            <Nav.Link href="#experience" className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('experience')}>Expérience</Nav.Link>
            <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => setActiveLink('contact')}>Contact</Nav.Link>
          </Nav>

          <div className = "d-flex justify-content-end gap-3 mt-3">
            <a href="" target= "_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
            </a>
            <a href="" target= "_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}