import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = 'http://localhost:3006'

export const TaskStatus = {
    Pending: 'Pending',
    Done: 'Done'
}

export const TaskGrade = {
    Poor: 'Poor',
    Good: 'Good',
    Average: 'Average',
    Excellent: 'Excellent'
}

export async function getAllTasks(searchParam){
    const allTasks = (await axios.get(`${apiUrl}/tasks`)).data;

    if(!searchParam)
        return allTasks;

    const loweredParam = searchParam.toLowerCase();

    return allTasks.filter(task => task.title.toLowerCase().includes(loweredParam) || task.content.toLowerCase().includes(loweredParam))
}

export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}

export async function getTasksByAuthorId(authorId, searchParam) {
    const allTasks = await getAllTasks(searchParam);

    return allTasks.filter(task => task.authorId === authorId);

}

export function getMyTasks(searchParam) {
    const loggedUser = getLoggedUser().id;

    return getTasksByAuthorId(loggedUser, searchParam);
}

export function saveTask(taskData) {
    const loggedUser = getLoggedUser();

    if(taskData.id) {
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }

    taskData.authorId = loggedUser.id;
    taskData.authorName= loggedUser.name;
    taskData.date = new Date();
    if(!taskData.status)
        taskData.status = TaskStatus.Pending;

    if(!taskData.grade)
        taskData.grade = TaskGrade.Poor;

    return axios.post(`${apiUrl}/tasks`, taskData);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}

export async function deleteTasksForAuthor(authorId) {
    const tasks = await getTasksByAuthorId(authorId);
    tasks.forEach(task => {
        deleteTask(task.id);
    });
}