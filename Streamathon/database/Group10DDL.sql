-- Project Step 2 Draft: Normalized Schema + DDL with Sample Data for Streamathon by Team AceSync, Group 10

-- Team Members: Hanjun Kim and Christian McKinnon, updated 2/14/2024

-- Citation 1: Project Step 2 Draft, Citation 2: Exploration - MySQL Cascade on Canvas by Professor Curry

-- Citation 3: Activity 4 - Creating Database Intersection Tables, Citation 4: Activity 1 - Creating a Customer Object Table on Canvas by Professor Curry

-- Citation 1: https://canvas.oregonstate.edu/courses/1946034/assignments/9456214?module_item_id=23809320

-- Citation 2: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-mysql-cascade?module_item_id=23809318

-- Citation 3: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307

-- Citation 4: https://canvas.oregonstate.edu/courses/1946034/pages/activity-1-creating-a-customer-object-table?module_item_id=23809297

-- The below code has been adapted from the SQL examples and concepts that have been delineated in the above Explorations from the OSU CS 340 course.

-- Let's begin by disabling the commits and foreign key checks as recommended on the Project Step 2 Draft page on Canvas
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- For all tables, we use the recommended syntax, "CREATE OR REPLACE," to minimize import errors

-- First let's CREATE a table for our Users Entity:
-- CREATE OR REPLACE TABLE Users 
--     (userID INT AUTO_INCREMENT PRIMARY KEY,
--     subscriptionID INT(11),
--     firstName VARCHAR(50) NOT NULL,
--     lastName VARCHAR(50) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     age INT(11),
--     FOREIGN KEY (subscriptionID) REFERENCES Subscriptions(subscriptionID) ON DELETE CASCADE);

CREATE OR REPLACE TABLE Users 
    (userID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT(11));

-- Next, let's create a table for our Movies Entity:
CREATE OR REPLACE TABLE Movies
    (movieID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    director VARCHAR(100),
    year INT(11) NOT NULL,
    duration INT(11),
    language VARCHAR(50));

-- Next, let's create our Subscriptions Entity:
CREATE OR REPLACE TABLE Subscriptions
    (subscriptionID INT(11) AUTO_INCREMENT PRIMARY KEY,
    userID INT(11),
    subTierID INT(11),
    subscriptionStatus TINYINT(4),
    autoRenew TINYINT(4),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (subTierID) REFERENCES SubscriptionTiers(subTierID));

-- Next, let's create our SubscriptionTiers Entity:
CREATE OR REPLACE TABLE SubscriptionTiers
    (subTierID INT(11) AUTO_INCREMENT PRIMARY KEY,
    subscriptionType VARCHAR(50) NOT NULL,
    price DECIMAL(4,2) NOT NULL);

-- Finally, let's create the Genres Entity:
CREATE OR REPLACE TABLE Genres
    (genreID INT(11) AUTO_INCREMENT PRIMARY KEY,
    genreType VARCHAR(50) NOT NULL);

-- Now we move to CREATE our Intersection Tables / Compositie Entities

-- Let's begin with our Intersection Table that connects Movies and Genres:

-- Within this table we implement our ON DELETE CASCADE which ensures when we remove a genreID from Genres, that all instances of that genreID

-- and its corresponding movieID are removed from the intersection table, MoviesGenresTable as well

-- First CREATE or REPLACE the intersection table

CREATE or REPLACE TABLE MoviesGenresTable
    (movieID INT(11) NOT NULL,
    genreID INT(11) NOT NULL,
    FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE,
    FOREIGN KEY (genreID) REFERENCES Genres(genreID));

-- Finally we CREATE our Composite Entity: Ratings:
CREATE OR REPLACE TABLE Ratings
    (ratingID INT(11) AUTO_INCREMENT PRIMARY KEY,
    userID INT(11) NOT NULL,
    movieID INT(11) NOT NULL,
    userRating INT(11) NOT NULL,
    ratingDate DATE NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE,
    CONSTRAINT unique_rating UNIQUE (userID, movieID));
 
-- INSERT DATA: Let's begin inserting our Example Data into the Movies table:
INSERT INTO Movies (movieID, title, director, year, duration, language)
VALUES 
    (1, 'Titanic', 'James Cameron', 1997, 195, 'English'),
    (2, 'Interstellar', 'Christopher Nolan', 2014, 169, 'English'),
    (3, 'Pan''s Labyrinth', 'Guillermo Del Toro', 2006, 119, 'Spanish'),
    (4, 'La La Land', 'Damien Chazelle', 2016, 129, 'English'),
    (5, 'Spirited Away', 'Hayao Miyazaki', 2001, 125, 'Japanese'),
    (6, 'Fight Club', NULL, 1999, 139, 'English'), -- director is David Fincher
    (7, 'Oppenheimer', 'Christopher Nolan', 2023, NULL, 'English'), -- duration is 180
    (8, 'Avatar', 'James Cameron', 2009, 162, NULL); -- language is English

-- Next let's insert our Example Data into the Users Table:
-- INSERT INTO Users (userID, subscriptionID, firstName, lastName, email, age)
-- VALUES
    -- (1000, 10001, 'Jack', 'Smith', 'js@gmail.com', 28),
    -- (1001, 10004, 'Xiao', 'Li', 'lx1@gmail.com', 45),
    -- (1002, 10000, 'Rachael', 'Johnson', 'rj22@yahoo.com', 19),
    -- (1003, 10002, 'Pedro', 'Gonzalez', 'pgw@ymail.com', 62),
    -- (1004, 10003, 'Ebrahim', 'Jones', 'ej00@gmail.com', NULL); -- age was 24, trying NULL value for age

INSERT INTO Users (userID, firstName, lastName, email, age)
VALUES
    (1000, 'Jack', 'Smith', 'js@gmail.com', 28),
    (1001, 'Xiao', 'Li', 'lx1@gmail.com', 45),
    (1002, 'Rachael', 'Johnson', 'rj22@yahoo.com', 19),
    (1003, 'Pedro', 'Gonzalez', 'pgw@ymail.com', 62),
    (1004, 'Ebrahim', 'Jones', 'ej00@gmail.com', NULL); -- age was 24, trying NULL value for age
    
-- Next let's insert our Example Data into the Subscriptions Table:
-- INSERT INTO Subscriptions (subscriptionID, subTierID, subscriptionStatus, autoRenew)
-- VALUES
--     (10000, 40000, 1, 0),
--     (10001, 40001, 1, 1),
--     (10002, 40002, 0, 1),
--     (10003, 40000, 0, 1),
--     (10004, 40002, 1, NULL); -- trying NULL for auto-renew

INSERT INTO Subscriptions (subscriptionID, userID, subTierID, subscriptionStatus, autoRenew)
VALUES
    (10000, 1000, 40000, 1, 0),
    (10001, 1001, 40001, 1, 1),
    (10002, 1002, 40002, 0, 1),
    (10003, 1003, 40000, 0, 1),
    (10004, 1004, 40002, 1, NULL); -- trying NULL for auto-renew

-- Next let's insert our Example Data into the SubscriptionTiers Table:
INSERT INTO SubscriptionTiers (subTierID, subscriptionType, price)
VALUES
    (40000, 'Basic', 5.99),
    (40001, 'Ad-Free', 9.99),
    (40002, 'Premium', 14.99);

-- Next let's insert our Example Data into the Genres Table:
INSERT INTO Genres (genreID, genreType)
VALUES
    (20000, 'Drama'),
    (20001, 'Fantasy'),
    (20002, 'Sci-Fi'),
    (20003, 'Animation'),
    (20004, 'Romance'),
    (20005, 'Action');

-- Now we will INSERT our Example Data into our Composite Entity, Ratings:
INSERT INTO Ratings (ratingID, userID, movieID, userRating, ratingDate)
VALUES
    -- one user (1001) gives reviews on two movies (1, 2)
    -- one user (1004) gives reviews on two movies (4, 5)
    -- no review was made by userID 1000
    -- one movie reviewed by multiple users (movieID = 4, userID = 1003, 1004)
    (30000, 1001, 1, 4, '2020-10-11'),
    (30001, 1001, 2, 5, '2019-08-08'),
    (30002, 1002, 3, 4, '2021-02-14'),
    (30003, 1003, 4, 4, '2023-01-25'),
    (30004, 1004, 5, 2, '2022-10-31'),
    (30005, 1004, 4, 2, '2023-01-26');

-- Lastly we INSERT our Example Data into the Intersection Table, MoviesGenresTable:
INSERT INTO MoviesGenresTable (movieID, genreID)
VALUES
    (1, 20004),
    (2, 20002),
    (3, 20001),
    (4, 20004),
    (5, 20003),
    (6, 20005),
    (7, 20000),
    (8, 20002);


-- Here we set up a trigger to automatically add new User entries to the Subscriptions entity
-- It adds the new User to Subscriptions with NULL values as that User does not yet have a Subscription
DELIMITER //

CREATE OR REPLACE TRIGGER insert_subscription_after_new_user
AFTER INSERT ON Users FOR EACH ROW
BEGIN
    INSERT INTO Subscriptions (userID, subTierID, subscriptionStatus, autoRenew)
    VALUES (NEW.userID, NULL, NULL, NULL);
END;
//

DELIMITER ;


-- As recommended, we reset foreign key checks to 1 at the end of our script
SET FOREIGN_KEY_CHECKS=1;
COMMIT;




------------------------------
-- Here we addres Step 2 Reviews from ULA and Peers:
------------------------------


-- Uncommenting this code block below will test to see if deletion of a user also correctly removes the subscription associated with that user

-- SELECT Users.firstName, Users.lastName FROM Users;
-- SELECT * FROM Subscriptions;
-- DELETE FROM Users Where Users.userID = 1001;
-- SELECT Users.firstName, Users.lastName FROM Users;
-- SELECT * FROM Subscriptions;


-- Uncommenting this code block below will test to see if deletion of a user also correctly removes that user's ratings

-- SELECT Users.firstName, Users.lastName FROM Users;
-- SELECT * FROM Ratings;
-- DELETE FROM Users Where Users.userID = 1001;
-- SELECT Users.firstName, Users.lastName FROM Users;
-- SELECT * FROM Ratings;


-- Uncommenting this code block below will test to see if deletion of a movie also correctly removes that movie's ratings

-- SELECT Movies.title, Movies.year FROM Movies;
-- SELECT * FROM Ratings;
-- DELETE FROM Movies WHERE Movies.movieID = 4;
-- SELECT Movies.title, Movies.year FROM Movies;
-- SELECT * FROM Ratings;


-- Uncommenting this code block shows that the 'many and 0' relationships are working correctly, it does so by presenting the average rating by movie title

-- SELECT * FROM Movies;
-- SELECT * FROM Users;
-- SELECT * FROM Ratings;
-- SELECT Movies.title, avg(Ratings.userRating) AS average_rating FROM Movies
--     JOIN Ratings ON Movies.movieID = Ratings.movieID
--     GROUP BY Movies.title;
