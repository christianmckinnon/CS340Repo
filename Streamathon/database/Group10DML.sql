-- Project Streamathon: Portfolio Project - Step 6 by Team AceSync, Group 10

-- Team Members: Hanjun Kim and Christian McKinnon, Updated 3/15/2024

-- The SQL code below has been adapted from the OSU CS 340 Explorations on SQL commands and CRUD

-- Citation 1: Activity 1 - Creating a Customer Object Table on Canvas by Professor Curry

-- Citation 2: Exploration Database Application Design on Canvas by Professor Curry

-- Citation 1: https://canvas.oregonstate.edu/courses/1946034/pages/activity-1-creating-a-customer-object-table?module_item_id=23809297

-- Citation 2: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325

-- Note: variables wrapped in colons (e.g. :userID:, :autoRenew:) are placeholders for inputs received from the front-end


-- *** Movies Entity: Includes CREATE, UPDATE, DELETE, and READ Functionality ***

-- A SELECT Statement to READ Movies
SELECT * FROM Movies;

-- A SELECT Statement for Movie Dropdown Menu (movie_dropdown)
SELECT movieID, title FROM Movies;

-- Query used to check if a Movie title already exists
SELECT COUNT(*) AS count FROM Movies WHERE title = :title:;

-- Query used to INSERT a new Movie Entry
INSERT INTO Movies (title, director, year, duration, language)
    VALUES (:title:, :director:, :year:, :duration:, :language:);

--Query used to UPDATE a Movie Entry
UPDATE Movies SET title = :title:, director = :director:, year = :year:, 
                    duration = :duration:, language = :language: WHERE movieID = :movieID:;

-- Query used to DELETE aMovie Entry
DELETE FROM Movies WHERE movieID = :movieID:


-- *** Users Entity: Includes CREATE, UPDATE, DELETE, and READ Functionality ***

-- A SELECT Statement to READ Users
SELECT * FROM Users;

-- A SELECT Statement for User Dropdown Menu (user_dropdown)
-- Note: This is not used within the Users Entity, it is used in Ratings (ADD) but we included it here
SELECT userID, CONCAT(firstName, ' ', lastName) AS fullName FROM Users;

-- Query used to INSERT a new User Entry
INSERT INTO Users (firstName, lastName, email, age)
    VALUES (:firstName:, :lastName:, :email:, :age:);

-- Query used to UPDATE a User Entry
UPDATE Users SET firstName=:firstName:, lastName=:lastName:, email=:email:, age=:age:
    WHERE userID=:userID:;

-- Query used to DELETE a User entry
DELETE FROM Users WHERE userID=:userID:;


-- *** Subscriptions Entity: Includes CREATE, UPDATE, and READ functionality (DELETE is handled only when a User is deleted) ***

-- The FK userID is nullable such that when a User cancels their subscription, the userID can be made NULL. If they resubscribe, their same userID can be reconnected

-- This query displays userID as userName, subtierID as subscriptionType and accounts for when userID is made NULL
SELECT subs.subscriptionID,
    CONCAT(COALESCE(usr.firstName, ''), ' ', COALESCE(usr.lastName, '')) AS userName,
    tier.subscriptionType AS subscriptionType,
    IF(subs.subscriptionStatus = 1, 'Active', 'Inactive') AS subscriptionStatus,
    IF(subs.autoRenew = 1, 'Yes', 'No') AS autoRenew
    FROM Subscriptions subs
LEFT JOIN Users usr ON usr.userID = subs.userID
LEFT JOIN SubscriptionTiers tier ON subs.subTierID = tier.subTierID
ORDER BY subs.subscriptionID;

-- SELECT Dropdowns for Subscriptions
-- A dropdown used in Subscriptions that gets unique subscriptionTypes from SubscriptionTiers 
-- and displays them when updating a User's Subscription
SELECT DISTINCT subtierID, subscriptionType AS subDropType FROM SubscriptionTiers;

-- Updating subscriptions for any existing user in the database
UPDATE Subscriptions 
    SET userID = (SELECT userID FROM Users WHERE CONCAT(firstName, ' ', lastName) = :userName:),
    subTierID = (SELECT subTierID FROM SubscriptionTiers WHERE subscriptionType = :subscriptionType:),
    subscriptionStatus = :subscriptionStatus:,
    autoRenew = :autoRenew:
    WHERE subscriptionID = :subscriptionID:;


-- *** Subscription Tiers Entity: Includes CREATE, UPDATE, and READ functionality (Any changes can be handled with updates) ***

-- A SELECT Statement for Subscription Tiers to READ the data on the front-end
SELECT * FROM SubscriptionTiers;

-- A query to INSERT a SubscriptionTier entry
INSERT INTO SubscriptionTiers (subscriptionType, price)
    VALUES (:subscriptionType:, :price:);

-- A query to UPDATE a SubscriptionTier entry
UPDATE SubscriptionTiers SET subscriptionType=:subscriptionType:, price=:price:
    WHERE subTierID=:subTierID:;

-- Dropdown Menus for from the SubscriptionTiers entity
-- Used in Subscriptions
SELECT DISTINCT subtierID, subscriptionType AS subDropType FROM SubscriptionTiers;
-- Used in SubscriptionTiers
SELECT * FROM SubscriptionTiers WHERE subTierID = :subTierID;


-- *** Genres Entity: Includes CREATE, UPDATE, and READ functionality ***

-- Query to READ in the Genres for our frontend
SELECT * FROM Genres;

-- Query to READ Genres in UPDATE
SELECT * FROM Genres WHERE genreID = :genreID:;

-- Query to INSERT Genres entries into our Genres table
INSERT INTO Genres (genreType)
    VALUES (:genreType:);

UPDATE Genres SET genreType=:genreType:
    WHERE genreID = :genreID:;

-- Dropdown menus used in MoviesGenresTable:
SELECT genreID, genreType FROM Genres;

-- *** Ratings Entity: Includes CREATE, READ, UPDATE, and DELETE Functionality ***

-- READ function for Ratings, which shows userID as userName, movidID as movieTitle to be more user-friendly
SELECT rat.ratingID, CONCAT(usr.firstName, ' ', usr.lastName) AS userName,
    mov.title AS movieTitle, 
    rat.userRating AS userRating,
    DATE_FORMAT(rat.ratingDate, "%Y-%m-%d") AS ratingDate
    FROM Ratings rat
INNER JOIN Users usr ON rat.userID = usr.userID
INNER JOIN Movies mov ON rat.movieID = mov.movieID
GROUP BY rat.ratingID;

-- Dropdowns for the ADD Form in Ratings to select the rating User and the rated movie
SELECT userID, CONCAT(firstName, ' ', lastName) AS fullName FROM Users;
SELECT movieID, title FROM Movies;

-- A query to INSERT a new Rating entry
-- Here, insertions are handled with the UNIQUE CONSTRAINT in our DDL such that no User can rate the same Movie twice:
INSERT INTO Ratings (userID, movieID, userRating, ratingDate)
    SELECT
        (SELECT userID FROM Users WHERE CONCAT(firstName, ' ', lastName) = :userID:) AS userInput,
        (SELECT movieID FROM Movies WHERE title = :movieID:) AS movieInput, :userRating:, ratingDate;

-- A query to UPDATE a Rating entry
-- Here, updates are handled with the UNIQUE CONSTRAINT in our DDL such that no User can rate the same Movie twice:
UPDATE Ratings SET userRating=:userRating:, ratingDate=:ratingDate:
    WHERE ratingID=:ratingID:;

-- A query to DELETE a Rating entry
DELETE FROM Ratings WHERE ratingID = :ratingID:;

-- *** MoviesGenres Intersection Table: Includes READ (SELECT), INSERT, and UPDATE Functionality  ***

-- A query that READs in the MoviesGenres Data with movieID as movieTitle and genreID and genreType
SELECT mov.title AS movieTitle, gen.genreType AS movieGenre FROM Movies mov
INNER JOIN MoviesGenresTable MGT ON mov.movieID = MGT.movieID
INNER JOIN Genres gen ON MGT.genreID = gen.genreID
GROUP BY mov.movieID;

-- A query to INSERT a new MoviesGenre entry
-- This can ONLY occur when BOTH the movieID and genreID already exist in the database, for example once we add a new Movie, 
-- then we can later add its Genre.
INSERT INTO MoviesGenresTable (movieID, genreID) SELECT
    (SELECT movieID FROM Movies WHERE title = :title:) AS movieInput,
    (SELECT genreID FROM Genres WHERE genreType = :genreType:) AS userInput;

-- A query to UPDATE an entry for the MoviesGenres Intersection Table
UPDATE MoviesGenresTable
    SET genreID = (
            SELECT genreID FROM Genres
            WHERE genreType = :genreType:
        )
    WHERE movieID = (
            SELECT movieID FROM Movies
            WHERE title = :title:);

-- A query to DELETE an entry from the MoviesGenres Table
DELETE FROM Movies WHERE movieID=:movieID:;

-- Though not included in the project, we might display the page as a "Presentation Page" for our Portfolio
-- We would also like to potentially present JOIN used to FKs User Friendly: Title, Director, Year, Duration, Language and Genre for the Intersection Table
SELECT mov.title as Title, mov.director AS Director, mov.year AS Year,
    mov.duration AS Duration, mov.language AS Language, gen.genreType AS Genres FROM Movies mov
INNER JOIN MoviesGenresTable MGT ON mov.movieID = MGT.movieID
INNER JOIN Genres gen ON MGT.genreID = gen.genreID;

-- Though not included in the project, we might display the page as a "Presentation Page" for our Portfolio
-- We are also looking into potentially adding an AverageRating Column to the above table (Maybe in a separate page on the Frontend):
SELECT mov.title AS Title, mov.director AS Director, mov.year AS Year, mov.duration AS Duration, 
    mov.language AS Language, gen.genreType AS Genres, AVG(rat.userRating) AS AverageRating FROM Movies mov
INNER JOIN MoviesGenresTable MGT ON mov.movieID = MGT.movieID
INNER JOIN Genres gen ON MGT.genreID = gen.genreID
LEFT JOIN Ratings rat ON mov.movieID = rat.movieID
GROUP BY mov.movieID, mov.title, mov.director, mov.year, mov.duration, mov.language, gen.genreType;

-- *** USER-FRIENDLY SELECT STATEMENTS ***

-- As shown above:
-- User-friendly version of Subscription entity page:
SELECT subs.subscriptionID, usr.firstName AS FirstName, usr.lastName AS LastName, tier.subscriptionType AS SubscriptionType, IF(subs.subscriptionStatus=1, 'Yes', 'No') AS SubscriptionStatus, IF(subs.autoRenew=1, 'Yes', 'No') AS AutoRenew FROM Subscriptions subs
INNER JOIN Users usr ON subs.userID = usr.userID
INNER JOIN SubscriptionTiers tier ON subs.subTierID = tier.subTierID
GROUP BY subs.subscriptionID;
-- As shown above:
-- User-friendly version of Ratings entity page:
SELECT
    subs.subscriptionID,
    CONCAT(COALESCE(usr.firstName, ''), ' ', COALESCE(usr.lastName, '')) AS userName,
    tier.subscriptionType AS subscriptionType,
    IF(subs.subscriptionStatus = 1, 'Active', 'Inactive') AS subscriptionStatus,
    IF(subs.autoRenew = 1, 'On', 'Off') AS autoRenew
FROM
    Subscriptions subs
LEFT JOIN
    Users usr ON usr.userID = subs.userID
LEFT JOIN
    SubscriptionTiers tier ON subs.subTierID = tier.subTierID
ORDER BY
    subs.subscriptionID;

-- END DML
