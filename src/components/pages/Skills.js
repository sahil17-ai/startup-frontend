// Skills.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; //

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null);

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

    const fetchSkills = async () => {
        const token = localStorage.getItem('accessToken');

        if (isTokenExpired(token)) {
            await refreshToken();
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/skills/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (newSkill.trim()) {
            try {
                await axios.post('http://127.0.0.1:8000/api/skills/', { name: [newSkill] }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming token is stored in localStorage
                    }
                });
                setNewSkill('');
                fetchSkills(); // Refresh the skills list after adding
            } catch (error) {
                console.error("Error adding skill:", error);
            }
        }
    };

    const handleDeleteSkill = async (skillId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/skills/${skillId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming token is stored in localStorage
                }
            });
            fetchSkills(); // Refresh the skills list after deletion
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    const handleUpdateSkill = async () => {
        if (selectedSkill && newSkill.trim()) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/skills/${selectedSkill.id}/`, { name: [newSkill] }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming token is stored in localStorage
                    }
                });
                setNewSkill('');
                setSelectedSkill(null);
                fetchSkills(); // Refresh the skills list after update
            } catch (error) {
                console.error("Error updating skill:", error);
            }
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <h3>Add Skill</h3>
                    <form onSubmit={handleAddSkill}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Skill Name"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Skill</button>
                        <button type="button" className="btn btn-warning" onClick={handleUpdateSkill} disabled={!selectedSkill}>Update Skill</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <h3>Skills</h3>
                    <div className="list">
                        {skills.map((skill) => (
                            <div className="item" key={skill.id}>
                                <i className="fa-brands fa-cogs"></i>
                                <div className="name">{skill.name[0]}</div> {/* Assuming the skill name is the first element */}
                                <div className="des">Description here</div>
                                <button className="btn btn-danger" onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
                                <button className="btn btn-info" onClick={() => { setNewSkill(skill.name[0]); setSelectedSkill(skill); }}>Edit</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
