-- Project Streamathon: Project Step 3 Draft Design HTML Interface + DML SQL for Streamathon by Team AceSync, Group 10

-- Team Members: Hanjun Kim and Christian McKinnon, 2/21/2024

-- The SQL code below has been adapted from the OSU CS 340 Explorations on SQL commands and CRUD

-- Citation 1: Activity 1 - Creating a Customer Object Table on Canvas by Professor Curry

-- Citation 2: Exploration Database Application Design on Canvas by Professor Curry

-- Citation 1: https://canvas.oregonstate.edu/courses/1946034/pages/activity-1-creating-a-customer-object-table?module_item_id=23809297

-- Citation 2: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325

-- Note: variables wrapped in colons (e.g. :userID:, :autoRenew:) are placeholders for inputs received from the front-end


-- *** Movies Entity: Includes CREATE, UPDATE, DELETE, and READ Functionality ***

SELECT movieID, title, director, year, duration, language FROM Movies
ORDER BY movieID ASC;
-- Or: 
SELECT * FROM Movies
ORDER BY movieID ASC;

-- A SELECT search-based query:
SELECT movieID, title, director, year, duration, language FROM Movies WHERE language = 'English';


INSERT INTO Movies (title, director, year, duration, language)
VALUES (:title:, :director:, :year:, :duration:, :language:);

-- Dropdowns for Adding a Genre to a Movie for the Intersection Table
-- Add a Genre to Movie Dropdowns:
-- A SELECT Statement for Movie Dropdown Menu
SELECT title FROM Movies
ORDER BY movieID;

-- A SELECT Statement for Genre Dropdrown Menu
SELECT genreType FROM Genres
ORDER BY genreID;

-- Here we can UPDATE movies without using the PK as every unique PK corresponds to 1 movie title
UPDATE Movies SET title=:title:, director=:director:, year=:year:, duration=:duration:, language=:language:
WHERE movieID=:movieID:;

DELETE FROM Movies WHERE movieID=:movieID:;


-- *** Users Entity: Includes CREATE, UPDATE, DELETE, and READ Functionality ***

SELECT userID, firstName, lastName, email, age FROM Users
ORDER BY userID ASC;
-- Or: 
SELECT * FROM Users
ORDER BY userID ASC;

-- Dropdowns for the ADD and UPDATE forms for Subscriptions:
-- Username / userID input field (the NULL option will be added manually):
SELECT firstName, lastName FROM Users
ORDER BY userID;

-- A SELECT Statement for Subscription Tiers
SELECT subscriptionType FROM SubscriptionTiers
ORDER BY subTierID;

INSERT INTO Users (firstName, lastName, email, age)
VALUES (:firstName:, :lastName:, :email:, :age:);

UPDATE Users SET firstName=:firstName:, lastName=:lastName:, email=:email:, age=:age:
WHERE userID=:userID:;

DELETE FROM Users WHERE userID=:userID:;


-- *** Subscriptions Entity: Includes CREATE, UPDATE, and READ functionality (DELETE is handled only when a User is deleted) ***

-- The FK userID is nullable such that when a User cancels their subscription, the userID can be made NULL. If they resubscribe, their same userID can be reconnected

SELECT subscriptionID, userID, subTierID, subscriptionStatus, autoRenew FROM Subscriptions
ORDER BY subscriptionID ASC;
-- Or: 
SELECT * FROM Subscriptions
ORDER BY subscriptionID ASC;

INSERT INTO Subscriptions (userID, subTierID, subscriptionStatus, autoRenew)
VALUES (:userID:, :subTierID:, :subscriptionStatus:, :autoRenew:);

UPDATE Subscriptions SET userID=:userID:, subTierID=:subTierID:, subscriptionStatus=:subscriptionStatus:, autoRenew=:autoRenew:
WHERE subscriptionID=:subscriptionID:;


-- *** Subscription Tiers Entity: Includes CREATE, UPDATE, and READ functionality (Any changes can be handled with updates) ***

SELECT subTierID, subscriptionType, price FROM SubscriptionTiers
ORDER BY subTierID ASC;
-- Or: 
SELECT * FROM SubscriptionTiers
ORDER BY subTierID ASC;

INSERT INTO SubscriptionTiers (subscriptionType, price)
VALUES (:subscriptionType:, :price:);

UPDATE SubscriptionTiers SET subscriptionType=:subscriptionType:, price=:price:
WHERE subTierID=:subTierID:;


-- *** Genres Entity: Includes CREATE, UPDATE, and READ functionality ***

SELECT genreID, genreType FROM Genres
ORDER BY genreID ASC;
-- Or: 
SELECT * FROM Genres
ORDER BY genreID ASC;

INSERT INTO Genres (genreType)
VALUES (:genreType);

UPDATE Genres SET genreType=:genreType:
WHERE genreID=:genreID:;


-- *** Ratings Entity: Includes CREATE, READ, UPDATE, and DELETE Functionality ***

-- If the DB Admin attempts to create a duplicate Rating for the same movieID, the system with throw a unique constraint error

SELECT ratingID, userID, movieID, userRating, ratingDate FROM Ratings
ORDER BY ratingID ASC;
-- Or: 
SELECT * FROM Ratings
ORDER BY ratingID ASC;

-- Dropdowns for the ADD Form in Ratings
-- Username / userID input field:
SELECT firstName, lastName FROM Users
ORDER BY userID;

-- A SELECT Statement Movie titles:
SELECT title FROM Movies
ORDER BY movieID;


-- Here, insertions are handled with the UNIQUE CONSTRAINT in our DDL such that no User can rate the same Movie twice:
INSERT INTO Ratings (userID, movieID, userRating, ratingDate)
    VALUES(:userID:, :movieID:, :userRating:, :ratingDate:);


-- Here, updates are handled with the UNIQUE CONSTRAINT in our DDL such that no User can rate the same Movie twice:
UPDATE Ratings SET userRating=:userRating:, ratingDate=:ratingDate:
WHERE ratingID=:ratingID:;

DELETE FROM Ratings WHERE ratingID=:ratingID:;

-- *** MoviesGenres Intersection Table: Includes READ (SELECT) and INSERT Functionality  ***

SELECT * FROM MoviesGenresTable
ORDER BY movieID ASC;

-- This can ONLY occur when BOTH the movieID and genreID already exist in the database, for example once we add a new Movie, then we can later add its Genre.
INSERT INTO MoviesGenresTable (movieID, genreID)
    VALUES(:movieID:, :genreID:);

-- We would also like to potentially present JOIN used to FKs User Friendly: Title, Director, Year, Duration, Language and Genre for the Intersection Table
SELECT mov.title as Title, mov.director AS Director, mov.year AS Year,
    mov.duration AS Duration, mov.language AS Language, gen.genreType AS Genres FROM Movies mov
INNER JOIN MoviesGenresTable MGT ON mov.movieID = MGT.movieID
INNER JOIN Genres gen oN MGT.genreID = gen.genreID;

-- We are also looking into potentially adding an AverageRating Column to the above table (Maybe in a separate page on the Frontend):
SELECT mov.title AS Title, mov.director AS Director, mov.year AS Year, mov.duration AS Duration, 
    mov.language AS Language, gen.genreType AS Genres, AVG(rat.userRating) AS AverageRating FROM Movies mov
INNER JOIN MoviesGenresTable MGT ON mov.movieID = MGT.movieID
INNER JOIN Genres gen ON MGT.genreID = gen.genreID
LEFT JOIN Ratings rat ON mov.movieID = rat.movieID
GROUP BY mov.movieID, mov.title, mov.director, mov.year, mov.duration, mov.language, gen.genreType;


-- END DML
