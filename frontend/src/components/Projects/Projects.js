import React, { useEffect, useState } from 'react';
import { Link } from'react-router-dom'
import api from '../../http/axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setItemsProject] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const response =  
        api.getProjects((response) => {
          setProjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteHandler = (id) => {
    try {
      const response =  
        api.deleteProject(id, (response) => {
          setProjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const addHandler = async () => {  
    if(newProject.name === undefined || newProject.description === undefined || newProject.initial_date === undefined) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await api.addProject(newProject, (response) => {
        setProjects([...projects, ...[response.data]]);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Projects</h1>
            <div className="flex mt-4">
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                  placeholder="Add Project" 
                  name="name" 
                  onChange={e => setItemsProject({...newProject, name: e.target.value})} />
                <button 
                  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" 
                  onClick={addHandler}>
                    {loading ?
                    <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div> :<span>Add</span>}
              </button>
            </div>
            <div className="flex mt-4">
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                  placeholder="Add Description" 
                  name="description"
                  onChange={e => setItemsProject({...newProject, description: e.target.value})}/>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                  </div>
                  <input 
                    type="date" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    name="initial_date" 
                    placeholder="Select date" 
                    onChange={e => setItemsProject({...newProject, initial_date: e.target.value})}/>
                </div>
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
        {!projects ? null : projects.map((project, index) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
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
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" id={project.id} onClick={() => deleteHandler(project.id)}>
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
