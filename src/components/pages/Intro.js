import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Intro = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSeeSkills = () => {
        navigate('/skills'); // Navigate to the Skills page
    };

    return (
        <div className="tab active" id="intro">
            <div className="container">
                <div className="avatar">
                    <img src="/img/avatar.png" alt="Sahil Dorugade" />
                </div>
                <div className="content">
                    <div className="name">Sahil Dorugade</div>
                    <div className="job">
                        I'm <span className="text-gradient">Developer</span>
                    </div>
                    <div className="des">
                        I am Sahil Dorugade, the developer of Talent Start. Our platform utilizes advanced matching algorithms to connect fresh graduates with new startups, helping both parties find the perfect fit for their needs and aspirations.
                        <br />
                        <a className="text-gradient" onClick={handleSeeSkills} style={{ cursor: 'pointer' }}>See my Skills</a>
                    </div>
                    <i className="fa-solid fa-quote-right"></i>
                </div>
            </div>
        </div>
    );
};

export default Intro;
