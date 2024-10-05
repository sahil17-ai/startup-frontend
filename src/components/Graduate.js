import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './css/Graduate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarGraduate from './NavbarGraduate'; // Import the new Navbar component
import Experience from './pages/Experience'; // Import the Experience component
import Intro from './pages/Intro'; // Import the Intro component
import Skills from './pages/Skills'; // Import the Skills component
import Project from './pages/Project'; // Import the Project component
import Contact from './pages/Contact'; // Import the Contact component

const Graduate = () => {
    const [activeTab, setActiveTab] = useState('intro');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/${tab}`); // Navigate to the appropriate tab
    };

    return (
        <div>
            <NavbarGraduate activeTab={activeTab} handleTabChange={handleTabChange} />

            <Intro />
            <Experience active={activeTab === 'experience'} />
            <Skills active={activeTab === 'skills'} />
            <Project active={activeTab === 'project'} />
            <Contact active={activeTab === 'contact'} />
        </div>
    );
};

export default Graduate;
