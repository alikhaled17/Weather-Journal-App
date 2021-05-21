// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes & dependencies
const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors');

// Start app from express
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// start main project folder
app.use(express.static('website'));


// Post route 
app.post('/add', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
    res.send(projectData);
});


// Get route 
app.get('/all', (req, res) => {
  res.send(projectData);
});

const port = 3000; // port 
const server = app.listen(port, ()=> {
  console.log(`server running on port : ${port}`);
}); 

