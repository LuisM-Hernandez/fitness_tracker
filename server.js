//Require modules
const express = require("express");
const Mongoose = require("mongoose");
const logger = require("morgan");

//Connection to port
// const PORT = 3002;
const PORT = process.env.PORT || 3002;
//App it creates a new instance of express?
const app = express();

app.use(logger("dev"))

//Functions that execute during the lifecycle of a request to the Express server. Each middleware has access to the HTTP request and response for each route (or path) it's attached to.
app.use(express.urlencoded({extended: true}));
//Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware.
app.use(express.static("public"));
app.use(express.json());

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"))


Mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout-tracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// Mongoose.connect("mongodb://localhost/workout", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });


//Listen for connections
app.listen(PORT, ()=>{
    console.log(`App running on http://localhost:${PORT}`);
});

