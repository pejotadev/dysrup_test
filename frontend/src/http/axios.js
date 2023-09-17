import axios from 'axios';
const baseURL = "http://localhost:8000/api";

axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`;

let api = Object.create(null);

api.baseURL = baseURL;

api.login = function (credentials, callback){
  axios.post(baseURL + "/user/login", credentials)
  .then(function (response) {
    callback(response);
    })
  .catch(function (error) {
      console.log(error);
    });
}

api.getProjects = function (callback) {
  axios.get(baseURL + "/project")
  .then(function (response) {
    callback(response);
    })
  .catch(function (error) {
      console.log(error);
    });
}

api.deleteProject = function (id, callback) {
  axios.delete(`${baseURL}/project/${id}`)
 .then(function (response) {
  callback(response);
  }
  ).catch(function (error) {
    console.log(error);
  });   
}

api.addProject = function (project, callback) {
  console.log(sessionStorage.getItem('token'));
  axios.post(baseURL + "/project/create", project)
  .then(function (response) {
    console.log(response);
    callback(response);
    })
  .catch(function (error) { 
    console.log(error);
  });
} 

api.getProjectTasks = function (project_id, callback) {
  axios.get(`${baseURL}/project/${project_id}/tasks`)
 .then(function (response) {
    callback(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

api.addTask = function (task, callback) {
  axios.post(baseURL + "/task/create", task)
 .then(function (response) {  
  callback(response);
  }).catch(function (error) {
    console.log(error);
  });
}

api.deleteTask = function (task_id, callback) {
  axios.delete(`${baseURL}/task/${task_id}`)
 .then(function (response) {
  callback(response);
  }
  ).catch(function (error) {
    console.log(error);
  });   
}

api.statusTaskHandler = function (task_id, status, callback) {
  axios.put(`${baseURL}/task/${task_id}`, {status: status})
 .then(function (response) {
  callback(response);
  }
  ).catch(function (error) {
    console.log(error);
  });   
}

export default api;