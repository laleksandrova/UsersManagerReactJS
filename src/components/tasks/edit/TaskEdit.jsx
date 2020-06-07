import React from 'react';
import { useState } from 'react';
import { saveTask, getTaskById } from '../../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import './TaskEdit.css';

export function TaskEdit(props) {

    const [currentTask, setCurrentTask] = useState({title: '', content: '', authorId: '', authorName: '', date: ''});

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() =>{
        if(props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id).then((result) => {
                setCurrentTask(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value

        }))
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(() => {
            setShouldRedirect(true);

            
        })
        .catch((err) => console.error(err));

    }

    return (
        <>
        { shouldRedirect && <Redirect to="/tasks" />}
        <div className="task-edit-wrapper">
            <form className="task-edit-form" onSubmit={onTaskSave}>
                <div className="form-group">
                    <label labelFor="title" class="text-white">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTask.title} />
                </div>
                <div className="form-group">
                    <label labelFor="content" class="text-white">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentTask.content} />
                </div>
                <div className="form-group">
                <label labelFor="grade" class="text-white">Grade: </label>
                    <select className="form-control" id="grade" name="grade" onChange={onInputChange} value={currentTask.grade}>
                    <option value="Poor">Poor</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Excellent">Excellent</option>                  
                    </select>
                </div>
                <div className="form-group">
                    <label labelFor="status" class="text-white">Status: </label>
                    <select className="form-control" id="status" name="status" onChange={onInputChange} value={currentTask.status}>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>                   
                    </select>
                    
                </div>
                <button className="btn btn-outline-light btn-success btn-lg mt-2">Save task</button>
            </form>
        </div>
        </>
    )

}