import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavbarGraduate = ({ activeTab, handleTabChange }) => {
    const navigate = useNavigate();

    const handleGraduateRedirect = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token || isTokenExpired(token)) {
            await refreshToken(); // Function should be defined in a shared location or imported
        }

        if (isTokenExpired(token)) {
            alert("You need to log in to access this page.");
            navigate("/login");
        } else {
            navigate("/graduate");
        }
    };

    return (
        <header>
            <nav>
                <a 
                    data-tab="intro" 
                    className={activeTab === 'intro' ? 'active' : ''} 
                    onClick={() => handleTabChange('intro')}
                >
                    Intro
                </a>
                <a 
                    data-tab="experience" 
                    className={activeTab === 'experience' ? 'active' : ''} 
                    onClick={() => handleTabChange('experience')}
                >
                    EXP
                </a>
                <a 
                    data-tab="skills" 
                    className={activeTab === 'skills' ? 'active' : ''} 
                    onClick={() => handleTabChange('skills')}
                >
                    Skill
                </a>
                <a 
                    data-tab="project" 
                    className={activeTab === 'project' ? 'active' : ''} 
                    onClick={() => handleTabChange('project')}
                >
                    Project
                </a>
                <a 
                    data-tab="contact" 
                    className={activeTab === 'contact' ? 'active' : ''} 
                    onClick={() => handleTabChange('contact')}
                >
                    Contact
                </a>
                <a 
                    data-tab="graduate" 
                    className={activeTab === 'graduate' ? 'active' : ''} 
                    onClick={handleGraduateRedirect} // Use handleGraduateRedirect for this link
                >
                    Graduate
                </a>
            </nav>
        </header>
    );
};

const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
};

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', {
            refresh: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.access);
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle logout if refresh fails
    }
};

export default NavbarGraduate;
