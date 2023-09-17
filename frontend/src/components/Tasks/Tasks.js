import React, { useEffect, useState } from 'react';
import Header from '../Header';
import api from '../../http/axios';
const moment = require('moment');

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({});
  const [newTask, setNewTask] = useState({});
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    try {
      const response =  
        api.getProjectTasks(id, (response) => {
          setTasks(response.data.tasks)
          delete response.data.tasks
          response.data.initial_date = moment(response.data.initial_date).format('DD/MM/YYYY');
          setProject(response.data)
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addHandler = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const task = {projectId: id, name: newTask.name, final_date: newTask.final_date}
    
    try {
      const response =  
        api.addTask(task, (response) => {
          setTasks([...tasks, response.data])
        });
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTask = (task_id) => {
    
    try {
      const response =  
        api.deleteTask(task_id, (response) => {
          setTasks(tasks.filter(task => task.id!= task_id))
        });
    } catch (error) {
      console.error(error);
    }
  }

  const statusTaskHandler = (task) => {
    const status = task.status == 'completed' ? 'active' : 'completed'

    try {
      const response = api.statusTaskHandler(task.id, status, (response) => {
        
        setTasks(tasks.map(task => {
          if(task.id == response.data.id) task = response.data
          return task
        }))
      })

    } catch (error) {
      console.error(error);
    }
  }

  return(
    <>
      <Header />
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg> 
              {project.initial_date}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">{project.name}</div>
            <p className="text-gray-700 text-base">{project.description}</p>
            <div className="flex mt-4">
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                  placeholder="Add Todo" 
                  onChange={e => setNewTask({...newTask, name: e.target.value})} />
                  <input 
                    type="date" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                    name="final_date" 
                    placeholder="Select date" 
                    onChange={e => setNewTask({...newTask, final_date: e.target.value})}
                    />
                <button 
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal" 
                  onClick={addHandler} >
                    Add
                </button>
            </div>
        </div>
        <div>
          {tasks && tasks.map((task, index) => {
            const lineThrough = task.status == 'completed' ? 'line-through' : ''
            const taskDate = moment(task.final_date).format('DD/MM/YYYY');
            return (
              <div className="flex mb-4 items-center" key={index}>
                <span className="w-full text-grey-darkest">
                  <p className={`${lineThrough}`}>{task.name}</p>
                  <span className={`text-gray-300 ${lineThrough}`}>{taskDate}</span> 
                </span>
                <button 
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-black text-green border-green hover:bg-green" 
                  onClick={() => statusTaskHandler(task)}>
                  {task.status === 'completed' ? 'Undone' : 'Done'}
                </button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-black hover:bg-red" onClick={() => deleteTask(task.id)}>Remove</button>
              </div>)
          })}
        </div>
    </div>
</div>
    </>
  );
}