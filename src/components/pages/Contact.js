import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Contact = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    
    const handleSeeSkills = () => {
        navigate('/intro'); // Navigate to the Skills page
    };

    return (
        <div className="tab" id="contact">
            <div className="container">
                <div className="content">
                    <div className="thank text-gradient">Thank you!</div>
                    <div className="des">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, laborum! Vitae perspiciatis error nobis dolore corrupti quos dolorum a veniam rem praesentium harum nam ipsum modi, in dignissimos voluptatem nesciunt eveniet, nihil doloremque. Eos, repellendus mollitia nemo soluta ex eum aliquid voluptates saepe voluptate minima! Commodi voluptatibus maxime suscipit ullam.
                        <br />
                        <a className="text-gradient" onClick={handleSeeSkills} style={{ cursor: 'pointer' }}>See my Intro</a>
                    </div>
                    <div className="list">
                        <div className="item">
                            <i className="fa-solid fa-phone"></i>
                            +84123XXX
                        </div>

                        <div className="item">
                            <i className="fa-regular fa-envelope"></i>
                            hohoang.XXX@gmail.com
                        </div>

                        <div className="item">
                            <i className="fa-brands fa-instagram"></i>
                            @lundev.web
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
