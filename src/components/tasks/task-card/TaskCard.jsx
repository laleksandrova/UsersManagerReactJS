import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';
import { TaskStatus } from '../../../core/api/tasks.api';
import { TaskGrade } from '../../../core/api/tasks.api';

const taskCardStyle = {
    maxWidth: '18rem'
};

const deleteBtnStyles = {
    cursor: 'pointer'
};

export function TaskCard({ task, onDeleteClick }) {

    const loggedUser = getLoggedUser();

    let taskClassByType = "card text-white m-3 ";
    switch(task.status){
        case TaskStatus.Done:
            taskClassByType += "bg-success"
        break;
        case TaskStatus.Pending:
            taskClassByType += "bg-info"
        break;
        default: 
            taskClassByType += "bg-info";
        break;
    }

    let taskTextByType = "card text-white m-3 ";
    switch(task.grade){
        case TaskGrade.Poor:
            taskTextByType += "bg-danger"
        break;
        case TaskGrade.Good:
            taskTextByType += "bg-warning"
        break;
        case TaskGrade.Average:
            taskTextByType += "bg-primary"
        break;
        case TaskGrade.Excellent:
            taskTextByType += "bg-success"
        break;
        default: 
            taskTextByType += "bg-danger";
        break;
    }

    return (
        <div className={taskClassByType} style={taskCardStyle}>
            <div className="card-header">                
                { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <span class="btn btn-warning"> <Link to={`/tasks/edit/${task.id}`}>Edit</Link> </span>}
                { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <span class="btn btn-danger ml-2" style={deleteBtnStyles} onClick={() => onDeleteClick(task.id)}>Delete</span> }
                <div className="card-body h5 mb-0">
                    <p className="card-text">{task.title}</p>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{task.content}</p>
            </div>
            <div className={taskTextByType}>
                <p className="card-text">Grade: {task.grade}</p>
            </div>
            <div className="card-footer bg-transparent border-secondary">
                <div>Author: {task.authorName}</div>
                <div>Created on: {task.date}</div>
            </div>
        </div>
    )
}