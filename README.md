# FlagQuiz - Documentation:
## Introduction
FlagQuiz is a single page app challenging the user to identify 20 randomly chosen flags. This documentation covers how to run, test and use the app, providing guides and some general information.
## Table of Contents
1. [ Files Included ](#Files_Included)
2. [ How to run locally ](#How_to_run_locally)
3. [ How to test ](#How_to_test)
4. [ How to use the app ](#How_to_use_the_app)
5. [ General Information ](#General_Information)
6. [ Licence ](#Licence)
<a name="Files_Included"></a>
## Files Included
Included with this README.MD should be the following files:
- server.js - (handles initialising the node server)
- app.js - (server side code which handles GET and POST requests)
- results.json - (server side directory to which results from the quiz are stored)
- app.test.js - (contains several jest test cases)
- .eslintrc.js - (contains eslint settings for testing the code quality)
- package.json - (information required for npm)
- client folder containing:
  - favicon.png - (browser icon)
  - flagquiz.png - (logo image)
  - index.html - (HTML page to be statically served)
  - index.js - (client-side JavaScript)
  - sliding-background-flags-colour.png - (image for the homescreen)
  - style.css - (css improving the look of the UI)
<a name="How_to_run_locally"></a>
## How to run locally
1. Make sure node and npm are installed.
2. Navigate using the command line to the FlagQuiz directory and type `npm install`, this should install the required packages.
3. Type `npm start` to start the server.
4. Open a modern web browser compatible with ES2017 (Required for async and await), the latest versions of Chrome or Firefox should suffice.
5. Navigate using a web browser to `localhost:8090` and the app should appear.
<a name="How_to_test"></a>
## How to test
1. Ensuring that the app is installed with npm, type `npm test` to run several jest test cases from app.test.js.
2. Alternatively, code quality can be tested by typing `npm run pretest` and a desired filename to run eslint on that file (note this is different to the default command found in the specification).
<a name="How_to_use_the_app"></a>
## How to use the app
After entering the app, the homescreen should be seen, with a title for the app and an aesthetically placed sliding background containing country flags. A navbar containing the options `new game`, `leaderboard` and `about`, as well as a logo should also be visible.

On clicking `about`, the content should be replaced with a short text explaining to the casual user how to operate the quiz. This information is relatively concise and excludes any in depth technical information.

On clicking `leaderboard`, the content should be replaced dynamically with the current leaderboard showing all recorded scores in order, returned from executing GET request which calls on the server to send the content of `results.json`. This is then rendered in the HTML. Included are some pre-generated example scores. 

On clicking `new game`, the website proceeds to start the quiz, and asks the user 20 questions requiring them to identify, out of four possible options, the flag shown to them on the screen. This uses a GET method to obtain country data from an external API, shown below, and passes it to be rendered in the client HTML. This process has been designed to be user-friendly and intuitive, displaying the current question and score, as well as the body of the question. When the user selects an option, The correct option is shown in green text and the app gives the user time to process the answer before proceeding to the next question. 

At the end of the questions the user is given the option to save their name, score and time using authentication or returning to the homescreen without saving. Saving uses a POST request to save the set of results and the name given by the user to the `results.json` file. If the name already exists in `results.json`, it is overwritten only if the new score and time are better than the old ones. This ensures that the leaderboard stays relatively clear for viewing. Authentication can be completed by using the external Auth0 service to login using Google, GitHub or through credentials dedicated to the app. Immediately after the results are saved, the user is logged out (ensuring that login is required for each POST request) and returned to the homescreen. For the purposes of testing, it is recommended to enter the code `testcode` in the input field rather than have to go through Auth0 for authentication, which requires an account.
<a name="General_Information"></a>
## General Information
The app employs the use of two main groups of entities, `flaglist` and `results`. `flaglist` contains entities including the URL of a random flag, and 4 country names for the user to choose between to answer each question, one of which being the country to which the flag belongs to. `results` contains entities including names of users, their score, time and rank in relation to other users. There exists a GET and POST method for `results`, the POST needing authentication using Auth0 or a code `testcode` intended to be used for test purposes. Provided is a sole GET method for `flaglist`, any POST method would be inappropriate given the relatively unalterable nature of the information provided (countries and flags). 

Two significant external web services have been implemented into the app. This includes, as aforementioned, Auth0 which provides the option to login using Google or GitHub authentication as well as a dedicated account service. This provides authentication for every separate POST request that is sent. Also, an external API is used, CountryAPI ([available here](https://github.com/fabian7593/CountryAPI)). This API is open source and free to use, and is used to provide flag URLs and country names to the client for each question.

The app uses the Bootstrap framework to provide a clean, simple and responsive UI, which has been optimised for mobile devices as well as traditional desktop browsers. Content is dynamically served and rendered using client side JavaScript. The website was built and tested using the Google Chrome (version 73) and Mozilla Firefox (version 66) web browsers, primarily on Windows 10. HTML was validated using the W3C validation service ([available here](https://validator.w3.org/)).

As well as running the app locally, the app has been deployed to the cloud using Heroku and can be found [here](https://theflagquiz.herokuapp.com/). Any added leaderboard results may be cleared periodically, ensuring it doesn't get too cluttered. As mentioned before, ensure that a modern web browser (compatible with ES2017) is used to view the website.

For an in-depth explanation of the code used, see the code comments.
<a name="Licence"></a>
## Licence

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. 
