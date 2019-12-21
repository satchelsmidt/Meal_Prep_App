# Meal_Prep_App

### About

This application is designed to simplify meal planning, and make it easier for busy individuals to both search for new recipes in a cuisine of their choice, and to plan out when to cook these recipes, with less effort on their part.

Users can create custom weekly meal plans based on three factors: 
  * Available hours each day of the week 
  * Cuisine type(s) 
  * Dietary preferences &amp; restrictions 

Once users input this information, the app generates a list of recipes that match the criteria. The user can then select a number of these recipes, which are then dispersed through the user’s schedule for that week based on their availability and the cook time for each recipe. Users are then presented with a schedule for that week that lists out which recipes will be cooked on which days of the week. Users are also given a ‘shopping list’ of ingredients for that week. 

This app is built using JavaScript, specifically Node.js, JQuery, and Express.js. Login and authenication is through Passport.js. Content is rendered using HTML/CSS, with styling components from MaterializeCSS. Data is stored using a MySQL database, and the app is deployed to Heroku. 

### Walkthrough

On app load, the user is presented with a signup screen. The user can sign up using a self-created username and password, or if they already have login credentials, they can click the button at the bottom of the form to be taken to a regular login page. 
<img src="/public/assets/images/signup.png" width="250" height="250"/>

Once the user is logged in, they are taken to a page with a brief description of how to use the application, as well as the ability to 'View Plans' and 'Create Plan'. __Note:__ the 'View Plans' menu option is still a work in progress
 
When the user clicks 'Create Plan,' they are taken to a page where they will be asked to input their plan information. They need to provide:
* The start date they would like for their plans (all plans are designed to be one week in length currently)
* The times each day of their plan that they are free to potentially prep meals
* The types of cuisines they want to receive recipes for. 
* Any dietary restrictions or allergies they have

Once all of this is input, the application returns a number of recipes matching the user criteria. The user can then select each recipe that they want to include in their plan. 

Once user selects recipes, they can hit create plan. This will take them to a page showing them a calendar with their week of meal planning, along with information cards for the recipes they have selected. A list of shopping ingredients for each recipe to be cooked is also displayed. 

This is a gif highlighting the plan creation and display process:
<br>
<img src="/public/assets/images/walkthrough_1.gif" width="600" height="250"/>


### Technology Used

* JavaScript
  * Node.js
  * Express.js
  * JQuery
  * Passport.js
  * Moment.js
* FullCalendar.io
* HTML
* CSS/Materialize
* MySQL

### Future Development


