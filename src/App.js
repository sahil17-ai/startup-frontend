// src/App.js
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Graduate from './components/Graduate';

import IntroPage from './components/pages/Intro';
import ExperiencePage from './components/pages/Experience';
import SkillsPage from './components/pages/Skills';
import ProjectPage from './components/pages/Project';
import ContactPage from './components/pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/graduate" element={<Graduate />} />

        <Route path="/intro" element={<IntroPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />


      </Routes>
    </Router>
  );
}

export default App;
