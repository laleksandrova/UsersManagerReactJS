import React from 'react';
import { useState } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { useEffect } from 'react';
import { getMyTasks } from '../../../core/api/tasks.api';

const listStyle = {
    display: 'flex',
    flexWrap: 'wrap'
};

export function MyTasks(props){
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyTasks(searchParam).then((tasks) => {
            setUserTasks(tasks);
        });
    }, [props.location.search]);

    return (
        <div className="my-tasks-wrapper" style={listStyle}> 
        { userTasks.map(task => <TaskCard task={task} key={task.id} /> )}
        </div>
    )
}