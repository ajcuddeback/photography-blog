const express = require('express');
const path = require('path');

// Require the database
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in production, user the client/build
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build/deploy')));
};

// User api routes
app.use(routes);

// If it is not in production, get build/deploy/index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/deploy/index.html'));
});

// Start the server after the database starts
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
});