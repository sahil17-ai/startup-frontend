import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/Graduate.css'; // Custom styles for additional styling

const Experience = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        description: '',
        id: null // Add id for updating
    });

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

    const fetchExperienceData = async () => {
        const token = localStorage.getItem('accessToken');

        if (isTokenExpired(token)) {
            await refreshToken();
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/experience/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setExperienceData(response.data);
        } catch (error) {
            console.error('Error fetching experience data:', error);
        }
    };

    useEffect(() => {
        fetchExperienceData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        if (isTokenExpired(token)) {
            await refreshToken();
        }

        try {
            if (formData.id) {
                // Update experience
                const response = await axios.put(`http://127.0.0.1:8000/api/experience/${formData.id}/`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setExperienceData((prevData) => prevData.map((exp) => (exp.id === formData.id ? response.data : exp)));
            } else {
                // Add new experience
                const response = await axios.post('http://127.0.0.1:8000/api/experience/', formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setExperienceData((prevData) => [...prevData, response.data]);
            }
            setFormData({
                title: '',
                company: '',
                start_date: '',
                end_date: '',
                description: '',
                id: null
            });
        } catch (error) {
            console.error('Error saving experience data:', error);
        }
    };

    const handleEdit = (exp) => {
        setFormData(exp); // Set formData to experience being edited
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('accessToken');

        if (isTokenExpired(token)) {
            await refreshToken();
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/experience/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setExperienceData((prevData) => prevData.filter((exp) => exp.id !== id));
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h2>Your Experience</h2>
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Job Title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {formData.id ? 'Update Experience' : 'Add Experience'}
                        </button>
                    </form>
                </div>
                <div className="col-md-8">
                    <h2>All Experiences</h2>
                    <ul className="list-group">
                        {experienceData.map((exp) => (
                            <li key={exp.id} className="list-group-item">
                                <h5>{exp.title} at {exp.company}</h5>
                                <p>{exp.start_date} - {exp.end_date}</p>
                                <p>{exp.description}</p>
                                <button onClick={() => handleEdit(exp)} className="btn btn-warning btn-sm me-2">Update</button>
                                <button onClick={() => handleDelete(exp.id)} className="btn btn-danger btn-sm">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Experience;
