import React, { useEffect, useState } from 'react';
import { Link } from'react-router-dom'
import api from '../../http/axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    try {
      const response =  
        api.getProjects((response) => {
          setProjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Projects</h1>
            <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Project" />
                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div>
        </div>
        <div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Project
                </th> 
                <th scope="col" className="px-6 py-3 text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
        {projects.map((project, index) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {project.name}
              </th>
              <td className="px-6 py-4 flex mb-4 item" dir="rtl">
                <Link 
                  to={`/tasks/?id=${project.id}`}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"> 
                  Open
                </Link>
                <button 
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
                  Done
                </button>
                <button 
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                  Remove
                </button>
              </td>
            </tr>)} 
            )}
        </tbody>
    </table>
</div>


            
        </div>
    </div>
</div>
    
  )
}
