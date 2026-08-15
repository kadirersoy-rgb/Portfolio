"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";

import styles from "./NavBar.module.css";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <Container>

        <Navbar.Brand href="#home" className={styles.brand}>
          Kadir.
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggle}
        />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className={styles.navLinks}>

            <Nav.Link
              href="#about"
              className={`${styles.navLink} ${
                activeLink === "about" ? styles.active : ""
              }`}
              onClick={() => setActiveLink("about")}
            >
              A propos
            </Nav.Link>

            <Nav.Link
              href="#skills"
              className={`${styles.navLink} ${
                activeLink === "skills" ? styles.active : ""
              }`}
              onClick={() => setActiveLink("skills")}
            >
              Compétences
            </Nav.Link>

            <Nav.Link
              href="#projects"
              className={`${styles.navLink} ${
                activeLink === "projects" ? styles.active : ""
              }`}
              onClick={() => setActiveLink("projects")}
            >
              Projets
            </Nav.Link>

            <Nav.Link
              href="#experience"
              className={`${styles.navLink} ${
                activeLink === "experience" ? styles.active : ""
              }`}
              onClick={() => setActiveLink("experience")}
            >
              Expérience
            </Nav.Link>

            <Nav.Link
              href="#contact"
              className={`${styles.navLink} ${
                activeLink === "contact" ? styles.active : ""
              }`}
              onClick={() => setActiveLink("contact")}
            >
              Contact
            </Nav.Link>

          </Nav>

          <div className={styles.socials}>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} />
            </a>

            <a href="" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
          </div>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};