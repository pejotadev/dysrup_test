import React, { useEffect, useState } from 'react';
import Header from '../Header';
import api from '../../http/axios';

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({});
  
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
  });

  return(
    <>
      <Header />
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">{project.name}</h1>
            <div className="flex mt-4">
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                  placeholder="Add Todo" />
                <button 
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
                    Add
                </button>
            </div>
        </div>
        <div>
          {tasks.map((task, index) => {
            const date = new Date(task.final_date);
            const formattedDate = date.toLocaleDateString('en-GB');
            const today = new Date()
            const color = date.toDateString() == today.toDateString() ? 'text-red-500' : 'text-gray-500';
            return (
              <div className="flex mb-4 items-center" key={index}>
                <span className="w-full text-grey-darkest">
                  <p>{task.name}</p> 
                  <spam className={`font-thin ${color}`}>Limit: {formattedDate}</spam>
                </span>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
              </div>)
          })}
        </div>
    </div>
</div>
    </>
  );
}