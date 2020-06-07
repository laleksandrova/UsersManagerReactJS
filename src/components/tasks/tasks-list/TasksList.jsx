import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask } from '../../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard';

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function TasksList(props) {

    const [tasks, setTasks] = useState([]); //state

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getAllTasks(searchParam).then((result) => {
            setTasks(result);
        });
    }, [props.location.search])

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => { //callback
                return prevState.filter(task => task.id !== id);
            })
        })
    };

    return (
        <div className="tasks-list-wrapper d-flex" style={listStyles}>
            { tasks.map(task => <TaskCard task = {task} key={task.id} onDeleteClick={onDelete} /> ) }
        </div>
    );
}