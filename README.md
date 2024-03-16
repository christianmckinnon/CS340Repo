# Project Step 6: Streamathon - A Database Portfolio Project for CS 340
### Hanjun Kim and Christian McKinnon
### Instructor: Professor Curry
### Term: Winter, 2024

# Project Summary:
Streamathon is a relatively new movie-streaming platform, where its 2,000 daily-active users have access to over 300 different movie titles on-demand. Our team intends to build a database designed to keep track of user-based movie ratings and subscriptions to gauge which movie contracts have been most profitable. Additional key metrics will include customer profile details and movie genre preferences, to provide insights that inform strategic decisions at the company’s business intelligence unit. Ultimately, these insights will play a pivotal role in determining how Streamathon curates and maintains its content catalog. 

Our Database Management System is hosted on http://flip2.engr.oregonstate.edu:7267/users and features eight total pages: one index page and seven pages for our entities: Movies, Users, Subscriptions, SubscriptionTiers, Genres, Ratings, and MoviesGenresTable. The Movies, Users, and Ratings pages have full CRUD – CREATE, READ, UPDATE, and DELETE functionality. Subscriptions, SubscriptionTiers, Genres, and MoviesGenresTable each have CRU – CREATE, READ, AND UPDATE functionality.

# Citations: (All code finalized on 3/15/2024)
## Handlebars files: (movies.hbs, users,hbs, subscriptions.hbs, subtiers.hbs, genres.hbs, ratings.hbs, movgentable.hbs)
Code Adapted from:
CS340 Canvas Module Week 6: Exploration - Web Application Technology by Professor Curry:
<https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327>

Steps 3 and 7: CS 340 GitHub: Node-Starter-JS Tutorial Guide  by Professor Curry:
<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)> 

<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data> 

## JavaScript Driver File and SQL Queries: (app.js)
Code Adapted from:
OSU CS 340 Github Node-Starter-JS Tutorial Guide Steps 0, 3 and 5 by Professor Curry:

https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js


https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)

<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data>

OSU CS 340 Canvas: Activity 5 - SQL Queries of Multiple Tables (JOINS) by Professor Curry:

<https://canvas.oregonstate.edu/courses/1946034/pages/activity-5-sql-queries-of-multiple-tables-joins?module_item_id=23809309>


OSU CS 340 Canvas Activity 1 - Creating a Customer Object Table on Canvas by Professor Curry:

<https://canvas.oregonstate.edu/courses/1946034/pages/activity-1-creating-a-customer-object-table?module_item_id=23809297>

OSU CS 340 Canvas: Exploration on Database Application Design on Canvas by Professor Curry:

<https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325>

OSU CS 340 Canvas Exploration - MySQL Cascade on Canvas by Professor Curry:

<https://canvas.oregonstate.edu/courses/1946034/pages/exploration-mysql-cascade?module_item_id=23809318>

## JavaScript ADD: (add_genre.js, add_movie.js, add_rating.js, add_subtier.js, add_user.js)
Code adapted from:
OSU 340 Github: Node-Starter-JS Tutorial Guide - Step 5: Adding New Data by Professor Curry

<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data#modify-appjs>

## JavaScript DELETE: (add_genre.js, add_movie.js, add_rating.js, add_subtier.js, add_user.js)
Code adapted from:
OSU 340 Github: Node-Starter-JS Tutorial Guide - Step 7: Dynamically Deleting Data by Professor Curry:

<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data>

## JavaScript UPDATE: (add_genre.js, add_movie.js, add_rating.js, add_subtier.js, add_user.js)
Code adapted from:
OSU 340 Github: Node-Starter-JS Tutorial Guide - Step 8: Dynamically Updating Data by Professor Curry:

<https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data>
