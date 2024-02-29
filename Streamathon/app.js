/* Hanjun Kim and Christian McKinnon CS 340 Portfolio Project
2/27/2024, Professor Curry

Citation: The following code has been adapted from the OSU CS 340 Github node-starer-js Tuturial Steps 0, 3 and 5.

https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/


/*
    Streamathon Frontend and Backend: app.js is the driver where all .js and .hbs files are routed
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 7267;                 // Here we change this to 7267

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
// ORIGINAL APP ROUTE TO INDEX
app.get('/index', function(req, res) {
    res.render('index');
});

// SELECT for Index
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Movies;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
    
// ROUTES Subscription Tiers Entity
// Routes Section: SELECT USER
app.get('/subtiers', function(req, res)
    {  
        let query1 = "SELECT * FROM SubscriptionTiers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('subtiers', {data: rows});               // Render the subtiers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
    
// ROUTES Section: ADD Subscription Tier
app.post('/add-subTier-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO SubscriptionTiers (subscriptionType, price)
    VALUES ('${data.subscriptionType}', '${data.price}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Movies
            query2 = `SELECT * FROM SubscriptionTiers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Routes Section: UPDATE SubscriptionTier
app.put('/put-subTier-ajax', function(req,res,next){
    let data = req.body;
  
    // Ensure subTierID is parsed to an integer
    let subTierID = parseInt(data.subTierID);
    let subscriptionType = data.subscriptionType;
    let price = parseInt(data.price);

    // Construct the SQL update query
    let queryUpdateUser = `UPDATE SubscriptionTiers SET subscriptionType = ?, price = ? WHERE subTierID = ?`;
    let selectSubTier = `SELECT * FROM SubscriptionTiers`;
  
          // Run the 1st query
          db.pool.query(queryUpdateUser, [subscriptionType, price, subTierID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectSubTier, [subTierID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// ROUTES Users Entity
// Routes Section: SELECT USER
app.get('/users', function(req, res)
    {  
        let query1 = "SELECT * FROM Users;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('users', {data: rows});                  // Render the users.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    }); 


// ROUTES Section: ADD USER
app.post('/add-user-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values: age
    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO Users (firstName, lastName, email, age)
    VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.age}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Movies
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Routes Section: DELETE User
app.delete('/delete-user-ajax/', function(req,res,next){
    let data = req.body;
    let userID = parseInt(data.userID);
    let deleteUsers= `DELETE FROM Users WHERE userID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteUsers, [userID], function(error, rows, fields){
              if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                    res.sendStatus(204);
                }
})});

// Routes Section: UPDATE USER
app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
  

    // Ensure userID is parsed to an integer
    let userID = parseInt(data.userID);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let age = parseInt(data.age);

    // Construct the SQL update query
    let queryUpdateUser = `UPDATE Users SET firstName = ?, lastName = ?, email = ?, age = ? WHERE userID = ?`;
    let selectUser = `SELECT * FROM Users`;
  
          // Run the 1st query
          db.pool.query(queryUpdateUser, [firstName, lastName, email, age, userID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectUser, [userID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// ROUTES MOVIES Entity
// Routes Section: SELECT MOVIE
app.get('/movies', function(req, res)
    {  
        let query1 = "SELECT * FROM Movies;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('movies', {data: rows});                  // Render the movies.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });
    


// ROUTES Section: ADD MOVIE
app.post('/add-movie-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values: duration and language
    // If a duration is not entered, it defaults to a value of 0
    let duration = parseInt(data.duration);
    if (isNaN(duration))
    {
        duration = 'NULL'
    }

    let language = data.language;  // language is a string

    if (language === null || language.toLowerCase() === 'null') {
        language = 'NULL';
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Movies (title, director, year, duration, language)
    VALUES ('${data.title}', '${data.director}', '${data.year}', '${data.duration}', '${data.language}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Movies
            query2 = `SELECT * FROM Movies;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE MOVIE
app.delete('/delete-movie-ajax/', function(req,res,next){
    let data = req.body;
    let movieID = parseInt(data.movieID);
    let deleteMovies_Genres = `DELETE FROM MoviesGenresTable WHERE movieID = ?`;
    let deleteMovies_Movie= `DELETE FROM Movies WHERE movieID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteMovies_Genres, [movieID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteMovies_Movie, [movieID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

// UPDATE MOVIE
app.put('/put-movie-ajax', function(req,res,next){
    let data = req.body;
  

    // Ensure movieID is parsed to an integer
    let movieID = parseInt(data.movieID);
    let title = data.title;
    let director = data.director;
    let year = parseInt(data.year);
    let duration = parseInt(data.duration);
    let language = data.language;
    

    // Construct the SQL update query
    let queryUpdateMovie = `UPDATE Movies SET title = ?, director = ?, year = ?, duration = ?, language = ? WHERE movieID = ?`;
    let selectMovie = `SELECT * FROM Movies`;
  
          // Run the 1st query
          db.pool.query(queryUpdateMovie, [title, director, year, duration, language, movieID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectMovie, [movieID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});