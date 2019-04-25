
// Detects the user choosing the newgame option on the navbar
document.getElementById('newGame').addEventListener('click', async function(){
    // Replaces page content to include question template
    let content = '<div class = "title">';
    content += '<div class="table">';
    content += '<table class="table">';
    content += '<tr>';
    content += '<td><h2 id="q"> Question:      </h2></td>';
    content += '<td><h2 id="score"> Score: 0 </h2></td>';
    content += '</tr>';
    content += '</table>';
    content += '</div>';
    content += '<h2> Identify the Flag: </h2>';
    content += '</div>';
    // Content is sent to HTML and rendered
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    // Records the start time
    let time = new Date();
    let flaglist = [];
    // Calls newFlag function to obtain flags and render questions
    newFlag(time, flaglist);
});
// Function which gets a random integer between min and max (The maximum is exclusive and the minimum is inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
// Function which waits 'time' amount of time (expects milliseconds), this is used to show correct answers to the user
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// newFlag generates and handles each successive question to be displayed to the user
async function newFlag(time, flaglist) {
    // Error handling ensures graceful handling of any problems
    try {
        // Sends GET request to obtain a random flag and 4 country options (including the correct one) from the server
        let response = await fetch('./randflag',
            {
                method: 'GET'
            });
        // Runs if the status received is in the 200 range (successful)
        if(response.ok){
            // Processes the response
            let body = await response.text();
            let parse = JSON.parse(body);
            // If we have already seen the flag, the GET request is sent again to receive another randomly generated flag
            if (flaglist.includes(parse[0])){
                newFlag(time, flaglist);
            }
            // Otherwise, we proceed to process the data obtained from the response
            else {
                // Add the country to which the flag belongs to the flaglist
                flaglist.push(parse[0]);
                // Generates a random position for the correct answer (so it isn't always in the same position)
                let rand = getRandomInt(1,5);
                // HTML code to display the flag to the user
                let content = '<div class="flagContainer">';
                content += '<img class="img-fluid" src=' + parse[0] + '>';
                content += '</div>';
                content += '<div class="table">';
                content += '<table class="table">';
                content += '<tr>';
                // Runs if the random number for the correct answer position is 1
                if (rand == 1){
                    // Places the correct answer in position 1
                    content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>';    
                }
                // Runs if the random number for the correct answer position is 2
                else if (rand == 2){
                    // Places the correct answer in position 2
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>';
                }
                // Runs if the random number for the correct answer positon is 3
                else if (rand == 3){
                    // Places the correct answer in position 3
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>';
                }
                // Runs if the random number for the correct answer positon is 4
                else if (rand == 4){
                    // Places the correct answer in position 4
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[4] + '</button></td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[3] + '</button></td>';
                    content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>';
                }
                // Finishes the HTML code 
                content += '</tr>';
                content += '</table>';
                content += '</div>';
                let working = false;
                // Content is send to HTML and rendered
                document.getElementById('content').innerHTML = content;
                // Determines question number and increases it by 1
                let question = document.getElementById('q').innerHTML;
                let qnumber = question.substr(11,2);
                let qnumberint = parseInt(qnumber, 10);
                qnumberint += 1;
                // If this question is the first one, question number is set to 1
                if (isNaN(qnumberint)){
                    qnumberint = 1;
                }
                // Sends question number to HTML to be rendered
                document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20';
                // Checks for selection of the correct answer
                document.getElementById('correct').addEventListener('click', async function(){
                    if (working == false){
                        // Locks the user out of choosing any other answer
                        working = true;
                        // Increases score by one
                        let score = document.getElementById('score').innerHTML;
                        let scorefrac = score.substr(8,2);
                        let scoreval = parseInt(scorefrac, 10);
                        scoreval += 1;
                        // Displays increased score to the page
                        document.getElementById('score').innerHTML = ' Score: '+ scoreval; 
                        // Colouring of options after answer is given to show the correct answer
                        let correct = document.getElementById('correct').innerHTML;
                        let wrong1 = document.getElementById('wrong').innerHTML;
                        let wrong2 = document.getElementById('wrong2').innerHTML;
                        let wrong3 = document.getElementById('wrong3').innerHTML;
                        document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>'; 
                        document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>';
                        document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>';
                        document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>';
                        // Continues to another flag if less than 20 questions have been shown, after pausing 2 seconds to show the user the correct answer
                        if (qnumberint < 20){
                            sleep(2000).then(() => {newFlag(time,flaglist);});
                        }
                        // If the user has answered the 20th question, the save function is executed, after pausing 2 seconds to show the user the correct answer
                        else {
                            sleep(2000).then(() => {save(time);});
                        }
                    }
                });
                // Checks for selection of a wrong answer
                document.getElementById('wrong').addEventListener('click', async function(){
                    if (working == false){
                        // Locks the user out of choosing any other answer
                        working = true;
                        // Colouring of options after answer is given to show the correct answer
                        let correct = document.getElementById('correct').innerHTML;
                        let wrong1 = document.getElementById('wrong').innerHTML;
                        let wrong2 = document.getElementById('wrong2').innerHTML;
                        let wrong3 = document.getElementById('wrong3').innerHTML;
                        document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>'; 
                        document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>';
                        document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>';
                        document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>';
                        // Continues to another flag if less than 20 questions have been shown, after pausing 2 seconds to show the user the correct answer
                        if (qnumberint < 20){
                            sleep(2000).then(() => {newFlag(time, flaglist);});
                        }
                        // If the user has answered the 20th question, the save function is executed, after pausing 2 seconds to show the user the correct answer
                        else {
                            sleep(2000).then(() => {save(time);});
                        }
                    }
                });
                // Checks for selection of another wrong answer
                document.getElementById('wrong2').addEventListener('click', async function(){
                    if (working == false){
                        // Locks the user out of choosing any other answer
                        working = true;
                        // Colouring of options after answer is given to show the correct answer
                        let correct = document.getElementById('correct').innerHTML;
                        let wrong1 = document.getElementById('wrong').innerHTML;
                        let wrong2 = document.getElementById('wrong2').innerHTML;
                        let wrong3 = document.getElementById('wrong3').innerHTML;
                        document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>'; 
                        document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>';
                        document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>';
                        document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>';
                        // Continues to another flag if less than 20 questions have been shown, after pausing 2 seconds to show the user the correct answer
                        if (qnumberint < 20){
                            sleep(2000).then(() => {newFlag(time, flaglist);});
                        }
                        // If the user has answered the 20th question, the save function is executed, after pausing 2 seconds to show the user the correct answer
                        else {
                            sleep(2000).then(() => {save(time);});
                        }
                    }
                });
                // Checks for selection of another wrong answer
                document.getElementById('wrong3').addEventListener('click', async function(){
                    if (working == false){
                        // Locks the user out of choosing any other answer
                        working = true;
                        // Colouring of options after answer is given to show the correct answer
                        let correct = document.getElementById('correct').innerHTML;
                        let wrong1 = document.getElementById('wrong').innerHTML;
                        let wrong2 = document.getElementById('wrong2').innerHTML;
                        let wrong3 = document.getElementById('wrong3').innerHTML;
                        document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>'; 
                        document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>';
                        document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>';
                        document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>';
                        // Continues to another flag if less than 20 questions have been shown, after pausing 2 seconds to show the user the correct answer
                        if (qnumberint < 20){
                            sleep(2000).then(() => {newFlag(time, flaglist);});
                        }
                        // If the user has answered the 20th question, the save function is executed, after pausing 2 seconds to show the user the correct answer
                        else {
                            sleep(2000).then(() => {save(time);});
                        }
                    }
                });
            }
        }
        // Detects any problem
        else {
            // Throws an error, including a statement as well as status code and text
            throw new Error('Problem getting flag: ' + response.status + ' ' + response.statusText);
        }
    }
    catch(error) {
        // Informs the user of the error
        alert (error);
    }
}
// save function handles the saving of names, scores and times to the server (results.JSON)
async function save(time) {
    // Records the current time and calculates the time difference 
    let time2 = new Date();
    let seconds = (time2 - time) /1000;
    // Processes the time to incorporate minutes and seconds, making times clearer for the user to interpret
    let mins = Math.floor(seconds/60);
    let rem = Math.floor(seconds % 60);
    if (rem.toString().length == 1) {
        rem = '0' + rem.toString();
    }
    // Determines and calculates the score
    let score = document.getElementById('score').innerHTML;
    let scorefrac = score.substr(8,2);
    let scoreval = parseInt(scorefrac, 10);
    // Collates HTML code to display to the user
    let content = '<div class = "title">';
    content += '<div class = "heading"';
    content += '<h2> Your Result: </h2>';
    content += '</div>';
    content += '<table class="scoretable">';
    content += '<tr>';
    content += '<td><h2> Enter your Name: </h2></td>';
    content += '<td><h2> Score (/20): </h2></td>';
    content += '<td><h2> Time (mins:secs): </h2></td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td><div class="inputbox"><input type="text" id="name" value="user"></div></td>';
    // Incorporates the user's score and time (seperated into minutes and remaining seconds)
    content += '<td><h2 id="score">' + scoreval + '</h2></td>';
    content += '<td><h2 id="time">' + mins + ':' + rem + '</h2></td>';
    content += '</tr>';
    content += '</table>';
    content += '</div>';
    content += '<div class = "title">';
    // Gives user options to authenticate to save their score
    content += '<h2> Authenticate to save your score: </h2>';
    content += '<button id="btn-login" class="btn btn-danger responsive-btn">';
    content += 'Authenticate';
    content += '</button>';
    // Code can be used for testing purposes, bypass the Auth0 login service. See README.MD for the code
    content += '<h3> Or enter code (for test purposes):</h3>';
    content += '<div class="submitbox">';
    content += '<input type="text" id="code"></div>';
    content += '<button id="enterCode" class="btn btn-danger responsive-btn">';
    content += 'Submit';
    content += '</button>';
    // User could choose to return to the homescreen without saving their scores
    content += '<h3> Return home without saving: </h3>';
    content += '<button id="gohome" class="btn btn-danger responsive-btn">';
    content += 'No Thanks';
    content += '</button>';
    content += '</div>';
    // Content sent to HTML and rendered
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    // Sends the user to the homescreen if they click the 'No Thanks' button
    document.getElementById('gohome').addEventListener('click', async function(){
        home();
    });
    // Detects the submission of the code used in testing
    document.getElementById('enterCode').addEventListener('click', async function(){
        // Builds the state object from the data collected as well as the code entered as a token to be used in authentication by the server
        const state = {'token': document.getElementById('code').value, 'name': document.getElementById('name').value, 'score': scoreval, 'time': seconds};
        // Runs sendResult function
        sendResult(state);
        // Then directs the user to the homescreen
        home();
    });
    var loginBtn = document.getElementById('btn-login');
    // LoginBtn detects selection of the 'Authenticate' option
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Builds the state object from the data collected as well leaving the token empty pending authentication
        const state = JSON.stringify({'token': '', 'name': document.getElementById('name').value, 'score': scoreval, 'time': seconds});
        // Triggers the Auth0 authorize service, saving the state object to be transferred after authentication
        auth0.authorize({
            state: state
        });
    });    
}
// sendResult function executes the POST request to save the data to the server (and subsequently the results.json file)
async function sendResult(result) {
    // Transfers the result to string format
    result = JSON.stringify(result);
    // Error handling ensures graceful handling of any problems
    try {
        // Sends POST request containing the result in the body
        let response = await fetch('./result',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'result=' + result
            });
        // Detects any problems in the execution of the POST request
        if(!response.ok){
            // Throws an error, including a statement as well as status code and text
            throw new Error('Problem sending results: ' + response.status + ' ' + response.statusText);
        }
    }
    catch (error) {
        // Informs the user of the error
        alert (error);
    }
}
// home function removes any dynamically generated content from the screen and restores the homescreen seen when the app is first loaded
async function home() {
    // HTML code to display to the user
    let response = '<div class="jumbotron">';
    response += '<h1>Flag Quiz</h1>';
    response += '<p>Test your vexillological knowledge!</p>';
    response += '</div>';
    response += '<div class="wrapper">';
    response += '<div class="sliding-background"></div>';
    response += '</div>';
    // Content sent to HTML and rendered after clearing the 'title' HTML code
    document.getElementById('title').innerHTML = '';
    document.getElementById('content').innerHTML = response;
}
// Detects selection of the 'leaderboard' option in the navbar
document.getElementById('leaderboard').addEventListener('click', async function(){
    // Provides the heading to display to the user
    let content = '<div class = "title">';
    content += '<div class = "heading"';
    content += '<h2> The Leaderboard: </h2>';
    content += '</div>';
    // Sends the code to the 'title' HTML
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    // Error handling ensures graceful handling of any problems
    try {
        // Sends GET request to obtain results from the server (ultimately the results.json file)
        let response = await fetch('./results',
            {
                method: 'GET',
            });
        // Runs if the status received is in the 200 range (successful)
        if(response.ok){
            // Processes the response
            let body = await response.text();
            let parse = JSON.parse(body);
            // Sets up the table to display the results
            let content = '<div class = "title">';
            content += '<table class="leadertable">';
            content += '<tr>';
            content += '<td><h3> Rank: </h3></td>';
            content += '<td><h3> Name: </h3></td>'; 
            content += '<td><h3> Score (/20): </h3></td>';
            content += '<td><h3> Time (mins:secs): </h3></td>';
            content += '</tr>';
            // Runs code to display an entry for each result
            for (let i = 0; i < parse.length; i++) {
                // Converts second format to mins and remaining seconds for ease of interpretation by the user
                let mins = Math.floor(parse[i].Time/60);
                let rem = Math.floor(parse[i].Time % 60);
                if (rem.toString().length == 1) {
                    rem = '0' + rem.toString();
                }
                // Adds each element of the results to the table, showing rank, name, score and time.
                content += '<tr>';
                content += '<td><h4>' + parse[i].Rank + '</h4></td>';
                content += '<td><h4>' + parse[i].Name + '</h4></td>';
                content += '<td><h4>' + parse[i].Score + '</h4></td>';
                content += '<td><h4>' + mins + ':' + rem + '</h4></td>';
                content += '</tr>';
            }
            // Finishes off the HTML code
            content += '</table>';
            content += '<br>';
            content += '</div>';
            // Sends the dynamically generated code to be rendered
            document.getElementById('content').innerHTML = content;
        }
        // Detects any problem
        else {
            // Throws an error, including a statement as well as status code and text
            throw new Error('Problem getting results: ' + response.status + ' ' + response.statusText);
        }
    }
    catch (error) {
        // Informs the user of the error
        alert (error);
    }
});
// Detects selection of the 'about' option in the navbar
document.getElementById('about').addEventListener('click', async function(){
    // HTML code for the title of the page
    let titlecontent = '<div class = "title">';
    titlecontent += '<div class = "heading"';
    titlecontent += '<h2> About The Flag Quiz <h2>';
    titlecontent += '</div>';
    titlecontent += '</div>';
    // Sends the content to be rendered
    document.getElementById('title').innerHTML = titlecontent;
    // HTML code explaining the context and process of the quiz
    let pagecontent = '<div class = "title">';
    pagecontent += '<br>';
    pagecontent += '<h3>Created as a submission for a programming summative assignment at Durham University.<h3>';
    pagecontent += '<br>';
    pagecontent += '<h2>Instructions:<h2>';
    pagecontent += '<div class = listText>';
    pagecontent += '<h3>You will be asked to identify 20 flags of various countries, chosen at random.<h3>';
    pagecontent += '<h3>Four countries are displayed below each flag, your task is to click the country who the flag belongs to.</h3>';
    pagecontent += '<h3>After answering the questions, you will receive a score and a time.</h3>';
    pagecontent += '<h3>You can choose to save your name, as well as your score and time to the leaderboard, accessible on the navbar.<h3>';
    pagecontent += '<h3>If you do save your result, you will receive a rank, based on the other results already on the leaderboard.</h3>';
    pagecontent += '<h3>Your best set of results is saved to your name each time.</h3>';
    pagecontent += '<h3>Press "New Game" on the navbar to begin!</h3>';
    pagecontent += '<br>';
    pagecontent += '</div>';
    // Sends the content to be rendered
    document.getElementById('content').innerHTML = pagecontent;
});
// Detects user click on the FlagQuiz logo on the navbar, in this event, the home function is executed
document.getElementById('home').addEventListener('click', async function(){
    home();
});
// Setup of the external Auth0 web authentication service
var auth0 = new auth0.WebAuth({
    // Domain and clientID provided, in accordance with the terms of service, no secret of any kind is given
    domain: 'dev-3vwxnh5c.auth0.com',
    clientID: '3ftlZ2VGXN7TfR08Fw4c36m495DcKuI4',
    responseType: 'token id_token',
    scope: 'openid',
    // Redirects user to the homescreen after authentication (not possible to redirect to another page due to the single-page nature of the app)
    redirectUri: window.location.href
});
// Runs on load of the homescreen
window.addEventListener('load', function() {
    // Auth0 functions handling authentication
    function handleAuthentication() {
        auth0.parseHash(function(err, authResult) {
        // Detects whether the user is logged in with the external Auth0 service
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                localLogin(authResult);
                // Detects any errors
            } else if (err) {
                alert(
                    'Error: ' + err.error
                );
            }
        });
    }
    // Runs if the user is logged in
    function localLogin(authResult) {
        // Retrieves the state variable
        let state = authResult.state;
        state = JSON.parse(state);
        // Signals that the user is authenticated and sends the result
        state.token = 'Authenticated';
        sendResult(state);
        // Logs the user out, ensuring that authentication is performed at every POST request (in accordance with the specification)
        window.location.replace('https://dev-3vwxnh5c.auth0.com/v2/logout?returnTo=' + window.location);
    } 
    handleAuthentication();
});