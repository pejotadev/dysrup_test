const db = require('../db/database');

exports.createTable = function(req, res) {
    let sql = `CREATE TABLE projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      start_date DATE
  );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created");
    });
}

exports.getProjects = function(req, res) {
  let sql = `SELECT * FROM projects`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

exports.getProjectWithTasks = function(req, res) {
  let sql = `SELECT * FROM projects
  LEFT JOIN tasks ON projects.id = tasks.project_id
  WHERE projects.id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

exports.getProject = function(req, res) {
  let sql = `SELECT * FROM projects WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

exports.updateProject = function(req, res) {
  let sql = `UPDATE projects SET name =?, description =?, start_date =? WHERE id =?`;
  db.query(sql, [req.body.name, req.body.description, req.body.start_date, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}


exports.deleteProject = function(req, res) {
  let sql = `DELETE FROM projects WHERE id =?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

exports.createProject = function(req, res) {
  let sql = `INSERT INTO projects (name, description, start_date) VALUES (?,?,?)`;
  db.query(sql, [req.body.name, req.body.description, req.body.start_date], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

exports.findById = function (req, res) {
  let sql = `SELECT * FROM projects WHERE id =?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}



