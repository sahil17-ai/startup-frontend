import React from 'react';

// Sample project data
const projectData = [
    {
        id: 1,
        image: 'img/project1.jpg', // Update with the correct path to your images in the public folder
        name: 'Name Project 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        job: 'FullStack',
        time: '2022/10/10',
    },
    {
        id: 2,
        image: 'img/project2.jpg',
        name: 'Name Project 2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        job: 'FullStack',
        time: '2022/10/10',
    },
    {
        id: 3,
        image: 'img/project3.jpg',
        name: 'Name Project 3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        job: 'FullStack',
        time: '2022/10/10',
    },
    {
        id: 4,
        image: 'img/project4.jpg',
        name: 'Name Project 4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        job: 'FullStack',
        time: '2022/10/10',
    },
    {
        id: 5,
        image: 'img/project5.jpg',
        name: 'Name Project 5',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        job: 'FullStack',
        time: '2022/10/10',
    },
];

const Project = () => {
    return (
        <div className="tab" id="project">
            <div className="container">
                <div className="list">
                    {projectData.map((project) => (
                        <div className="item" key={project.id}>
                            <img src={project.image} alt={project.name} />
                            <div className="index">#{project.id}</div>
                            <div className="name">{project.name}</div>
                            <div className="des">{project.description}</div>
                            <div className="author">
                                <div className="job">{project.job}</div>
                                <div className="time">
                                    {project.time}
                                    <i className="fa-regular fa-clock"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
