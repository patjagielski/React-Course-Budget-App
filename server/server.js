const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

//creates express application
app.use(express.static(publicPath));

//makes sure can access other pages from outside
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//on what server port it runs on!
app.listen(port, () => {
    console.log('Server is up!');
});