const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// Routes
const taskRoutes = require('./routes/taskRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Middleware configuration
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(passport.initialize());

// Route middleware
app.use('/api/task', taskRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes);

// Port
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});