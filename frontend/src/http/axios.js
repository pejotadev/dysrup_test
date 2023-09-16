import axios from 'axios';
const baseURL = "http://localhost:8000/api";

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

api.getProjectTasks = function (project_id, callback) {
  axios.get(`${baseURL}/project/${project_id}/tasks`)
 .then(function (response) {
  callback(response);
  })
  .catch(function (error) {
      console.log(error);
    });
}

api.post = function (baseURL, credentials, callback){
  axios.post(baseURL, credentials)
  .then(function (response) {
    callback(response);
    })
  .catch(function (error) {
      console.log(error);
    });
}

export default api;