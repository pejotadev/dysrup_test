const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const taskRoutes = require('./routes/taskRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');

// Middleware configuration
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());

// Route middleware
app.use('/api/task', taskRoutes);
app.use('/api/project', projectRoutes);

// Port
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});