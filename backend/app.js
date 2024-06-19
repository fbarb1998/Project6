const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://fbarb1998:mfM3ixlPDXqzMd9M@cluster0.pcmsk0b.mongodb.net/')
    .then(() => {
        console.log('Sucessfully connected to MongoDB Atlas!')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

// Route to handle API requests
app.get('/api/stuff', (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;