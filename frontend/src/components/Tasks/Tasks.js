import React, { useEffect, useState } from 'react';
import Header from '../Header';
import api from '../../http/axios';

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
          setProject(response.data)
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addHandler = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const task = {projectId: id, name: newTask.name}
    
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
            <h1 className="text-grey-darkest">{project.name}</h1>
            <h1 className="text-grey-darkest">{project.description}</h1>
            <span>Start: {project.initial_date}</span>
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
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" 
                  onClick={addHandler} >
                    Add
                </button>
            </div>
        </div>
        <div>
          {tasks && tasks.map((task, index) => {
            const lineThrough = task.status == 'completed' ? 'line-through' : ''
            return (
              <div className="flex mb-4 items-center" key={index}>
                <span className="w-full text-grey-darkest">
                  <p className={`${lineThrough}`}>{task.name}</p> 
                </span>
                <button 
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" 
                  onClick={() => statusTaskHandler(task)}>
                  {task.status === 'completed' ? 'Undone' : 'Done'}
                </button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => deleteTask(task.id)}>Remove</button>
              </div>)
          })}
        </div>
    </div>
</div>
    </>
  );
}