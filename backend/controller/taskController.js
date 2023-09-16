const db = require('../db/database');

// Create a new database
exports.createDB = function(req, res) {
    let sql = "CREATE DATABASE dysruptest";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Database created");
    });
}

exports.createTable = function(req, res) {
    let sql = `CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        project_id INT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created");
    });
}

exports.createTask = function(req, res) {
    let sql = "INSERT INTO task (name, description, project_id) VALUES (?,?,?)";
    db.query(sql, [req.body.name, req.body.description, req.body.project_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Task created");
    });
}

exports.show = function(req, res) {
    let sql = "SELECT * FROM task";
    db.query(sql, (err, result) => {
        if (err) throw res.json(err);
        
        return res.status(200).json(result);
    });
}

exports.showProjectTasks = function(req, res) {
    let sql = "SELECT * FROM task WHERE project_id =?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw res.json(err);
        
        return res.status(200).json(result);
    });
}

exports.findById = function(req, res) {
    let sql = "SELECT * FROM task WHERE id =?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw res.json(err);
        
        return res.status(200).json(result);
    });
}

exports.update = function(req, res) {
    let sql = "UPDATE task SET description =? WHERE id =?";
    db.query(sql, [req.body.description, req.params.id], (err, result) => {
        if (err) throw res.json(err);
        
        return res.status(200).json(result);
    });
}

exports.delete = function(req, res) {
    let sql = "DELETE FROM task WHERE id =?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw res.json(err);
        
        return res.status(200).json(result);
    });
}

