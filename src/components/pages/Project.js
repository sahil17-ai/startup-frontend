// Project.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
    const [selectedProject, setSelectedProject] = useState(null);

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

    const fetchProjects = async () => {
        const token = localStorage.getItem('accessToken');

        if (isTokenExpired(token)) {
            await refreshToken();
        }
    
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (newProject.title.trim()) {
            try {
                await axios.post('http://127.0.0.1:8000/api/projects/', newProject, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNewProject({ title: '', description: '', link: '' });
                fetchProjects(); // Refresh the projects list after adding
            } catch (error) {
                console.error("Error adding project:", error);
            }
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/projects/${projectId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            fetchProjects(); // Refresh the projects list after deletion
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleUpdateProject = async () => {
        if (selectedProject && newProject.title.trim()) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/projects/${selectedProject.id}/`, newProject, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNewProject({ title: '', description: '', link: '' });
                setSelectedProject(null);
                fetchProjects(); // Refresh the projects list after update
            } catch (error) {
                console.error("Error updating project:", error);
            }
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <h3>Create Project</h3>
                    <form onSubmit={handleAddProject}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Project Title"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Project Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="url"
                                className="form-control"
                                placeholder="Project Link"
                                value={newProject.link}
                                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                        <button type="button" className="btn btn-warning" onClick={handleUpdateProject} disabled={!selectedProject}>Update Project</button>
                    </form>
                </div>
                <div className="col-md-8">
                    {projects.length > 0 && <h3>Projects</h3>}
                    <div className="list">
                        {projects.map((project) => (
                            <div className="item" key={project.id}>
                                <div className="index">#{project.id}</div>
                                <div className="name">{project.title}</div>
                                <div className="des">{project.description}</div>
                                {project.link && (
                                    <div className="link">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                                    </div>
                                )}
                                <button className="btn btn-danger" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                                <button className="btn btn-info" onClick={() => { setNewProject({ title: project.title, description: project.description, link: project.link }); setSelectedProject(project); }}>Edit</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
