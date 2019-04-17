/*
function add(h2,seconds,minutes,hours) {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer()
}
function timer(h2,seconds,minutes,hours) {
    t = setTimeout(add(h2,seconds,minutes,hours), 1000);
}
*/
/*
document.getElementById('newgame').addEventListener('click', async function(event){
    var seconds = 0, minutes = 0, hours = 0;
    let content = '<div class="topContainer">';
    content += '<h1 style="display:inline;">Time: </h1>';
    content += '<h2 style="display:inline;"><time>00:00:00</time></h2>';
    content += '</div>';
    document.getElementById('content').innerHTML = content;
    var h2 = document.getElementsByTagName('h2')[0];
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer()
    }
    function timer() {
        t = setTimeout(add, 1000);
    }
    timer();
})
*/

document.getElementById('newGame').addEventListener('click', async function(event){
    let content = '<div class = "title">';
    content += '<div class="table">'
    content += '<table class="table">'
    content += '<tr>'
    content += '<td><h2 id="q"> Question:      </h2></td>';
    content += '<td><h2 id="score"> Score: 0 </h2></td>';
    content += '</tr>'
    content += '</table>'
    content += '</div>'
    content += '<h2> Identify the Flag: </h2>'
    content += '</div>';
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    console.log('working')
    let time = new Date()
    newFlag(time)
    console.log("c'est fini")

})
// Gets random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}



/*
document.getElementById('new').addEventListener('click', async function(event){
*/
async function newFlag(time) {
    /*let response = ['response'];
    document.getElementById('content').innerHTML = response;*/
    console.log('fetching now')
    try {
        let response = await fetch('http://127.0.0.1:8090/randflag',
        {
        method: "GET"
        });
        if(response.ok){
            console.log('alright guys lets get started')
            let body = await response.text();
            let parse = JSON.parse(body)
            console.log(parse[0])
            // Right answer position
            let rand = getRandomInt(1,5)

            /*let flagJSON = JSON.parse(body);
            console.log(flagJSON)*/
            let content = '<div class="flagContainer">'
            content += '<img class="img-fluid" src=' + parse[0] + '>';
            content += '</div>';
            content += '<div class="table">'
            content += '<table class="table">'
            content += '<tr>'
            /*
            if (rand == 1){
                content += '<td>' + parse[1] + '</td>'
                content += '<td>' + parse[2] + '</td>'
                content += '</tr>'
                content += '<tr>'
                content += '<td>' + parse[3] + '</td>'
                content += '<td>' + parse[4] + '</td>'
            } */
            if (rand == 1){
                /*
                content += '<div id="correct-outer">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer1">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                /*
                content += '</div>'
                */
                content += '</tr>'
                content += '<tr>'
                /*
                content += '<div id="wrong-outer2">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer3">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
                /*
                content += '</div>'
                */
                
            }
            else if (rand == 2){
                /*
                content += '<div id="wrong-outer1">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="correct-outer">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                /*
                content += '</div>'
                */
                content += '</tr>'
                content += '<tr>'
                /*
                content += '<div id="wrong-outer2">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer3">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
                /*
                content += '</div>'
                */
            }
            else if (rand == 3){
                /*
                content += '<div id="wrong-outer1">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer2">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                /*
                content += '</div>'
                */
                content += '</tr>'
                content += '<tr>'
                /*
                content += '<div id="correct-outer">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer3">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
                /*
                content += '</div>'
                */
            }
            else if (rand == 4){
                /*
                content += '<div id="wrong-outer1">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="wrong-outer2">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[4] + '</button></td>'
                /*
                content += '</div>'
                */
                content += '</tr>'
                content += '<tr>'
                /*
                content += '<div id="wrong-outer3">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[3] + '</button></td>'
                /*
                content += '</div>'
                content += '<div id="correct-outer">'
                */
                content += '<td><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                /*
                content += '</div>'
                */
            }
            content += '</tr>'
            content += '</table>'
            content += '</div>'
            console.log(content)
            let working = false

            document.getElementById('content').innerHTML = content
            let question = document.getElementById('q').innerHTML;
            let qnumber = question.substr(11,2);
            let qnumberint = parseInt(qnumber, 10);
        
            qnumberint += 1
            console.log(question)
            console.log(qnumber)
            console.log(qnumberint)
            if (isNaN(qnumberint)){
                qnumberint = 1
            }
            document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
            
            /*alert(body)*/
            document.getElementById('correct').addEventListener('click', async function(event){
                if (working == false){
                    working = true
                    let score = document.getElementById('score').innerHTML
                    let scorefrac = score.substr(8,2)
                    let scoreval = parseInt(scorefrac, 10);
                    scoreval += 1
                    console.log(score)
                    console.log(scorefrac)
                    console.log(scoreval)
                    document.getElementById('score').innerHTML = ' Score: '+ scoreval 
                    /*
                    let question = document.getElementById('q').innerHTML;
                    let qnumber = question.substr(11,2);
                    let qnumberint = parseInt(qnumber, 10);
                    qnumberint += 1
                    console.log(question)
                    console.log(qnumber)
                    console.log(qnumberint)
                    document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
                    */
                    // Colouring of options after answer is given to show the correct answer
                    let correct = document.getElementById('correct').innerHTML
                    let wrong1 = document.getElementById('wrong').innerHTML
                    let wrong2 = document.getElementById('wrong2').innerHTML
                    let wrong3 = document.getElementById('wrong3').innerHTML
                    console.log(correct)
                    document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>' 
                    document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>'
                    document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>'
                    document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>'
                    
                    /*
                    let correct = document.getElementById('correct-outer').innerHTML
                    console.log(correct)
                    */
                    if (qnumberint < 20){
                        sleep(2000).then(() => {newFlag(time)});
                    }
                    else {
                        sleep(2000).then(() => {save(time)});
                    }
                }
            })
            function wrong(){
                if (working == false){
                    working = true
                    /*
                    let question = document.getElementById('q').innerHTML;
                    let qnumber = question.substr(11,2);
                    let qnumberint = parseInt(qnumber, 10);
                    qnumberint += 1
                    console.log(question)
                    console.log(qnumber)
                    console.log(qnumberint)
                    document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
                    */
                    // Colouring of options after answer is given to show the correct answer
                    let correct = document.getElementById('correct').innerHTML
                    let wrong1 = document.getElementById('wrong').innerHTML
                    let wrong2 = document.getElementById('wrong2').innerHTML
                    let wrong3 = document.getElementById('wrong3').innerHTML
                    console.log(correct)
                    document.getElementById('correct').innerHTML = '<span style="color:green">' + correct + '</span>' 
                    document.getElementById('wrong').innerHTML = '<span style="color:red">' + wrong1 + '</span>'
                    document.getElementById('wrong2').innerHTML = '<span style="color:red">' + wrong2 + '</span>'
                    document.getElementById('wrong3').innerHTML = '<span style="color:red">' + wrong3 + '</span>'
                    if (qnumberint < 20){
                        sleep(2000).then(() => {newFlag(time)});
                        /*
                        newFlag(time)
                        */
                    }
                    else {
                        sleep(2000).then(() => {save(time)});
                    }
                }
            }
            document.getElementById('wrong').addEventListener('click', async function(event){
                wrong()
                /*
                if (working == false){
                    working = true
                    let question = document.getElementById('q').innerHTML;
                    let qnumber = question.substr(11,2);
                    let qnumberint = parseInt(qnumber, 10);
                    qnumberint += 1
                    console.log(question)
                    console.log(qnumber)
                    console.log(qnumberint)
                    document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
                    if (qnumberint < 21){
                        newFlag(time)
                    }
                }
                */
            })
            document.getElementById('wrong2').addEventListener('click', async function(event){
                wrong()
            })
            document.getElementById('wrong3').addEventListener('click', async function(event){
                wrong()
            })
            console.log(time)
            /*
            let question = document.getElementById('q').innerHTML;
            let qnumber = question.substr(11,2);
            let qnumberint = parseInt(qnumber, 10);
            qnumberint += 1
            console.log(question)
            console.log(qnumber)
            console.log(qnumberint)
            document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
            */
        }
        else {
            throw new Error("Problem Getting flag" + response.code);
        }
    }
    catch(error) {
        alert ("problem: " + error);
    }
    /*
    let response = await fetch('http://127.0.0.1:8090/randflag',
    {
      method: "GET"
    });
    */
};
async function save(time) {
    let time2 = new Date()
    timediff = time2 - time
    console.log(timediff)
    let seconds = (time2 - time) /1000
    let minutes = seconds/60
    remSecs = seconds - (minutes * 60)
    console.log(seconds)
    console.log(minutes)
    console.log(remSecs)
    console.log('')
    let mins = Math.floor(seconds/60);
    let rem = Math.floor(seconds % 60);
    if (rem.toString().length == 1) {
        rem = '0' + rem.toString()
    }
    console.log(mins)
    console.log(rem)
    let score = document.getElementById('score').innerHTML
    let scorefrac = score.substr(8,2)
    let scoreval = parseInt(scorefrac, 10);

    let content = '<div class = "title">';
    content += '<div class = "heading"'
    content += '<h2> Your Result: </h2>';
    content += '</div>';

    /*content += '<div class = "leftrightpadding">'*/

    /*content += '<div class="table">';*/
    content += '<table class="scoretable">';
    content += '<tr>';
    content += '<td><h2> Enter your Name: </h2></td>';
    content += '<td><h2> Score (/20): </h2></td>';
    content += '<td><h2> Time (mins:secs): </h2></td>';
    content += '</tr>';
    content += '<tr>';
    content += '<td><div class="inputbox"><input type="text" id="name" value="user"></div></td>';
    content += '<td><h2 id="score">' + scoreval + '</h2></td>';
    content += '<td><h2 id="time">' + mins + ':' + rem + '</h2></td>';
    content += '</tr>';
    content += '</table>';
    /*content += '</div>';*/
    /*content += '</div>';*/
    content += '</div>';
    content += '<div class = "title">';
    content += '<h2> Authenticate to save your score: </h2>';
    /*content += '<button id="btn-login" class="btn btn-primary btn-margin">'*/
    content += '<button id="btn-login" class="btn btn-danger responsive-btn">'
    content += 'Authenticate with Auth0'
    content += '</button>'
    content += '<h3> Or enter code (for test purposes):</h3>'
    content += '<div class="inputbox">'
    content += '<input type="text" id="code">'
    content += '</div>'
    content += '<h3> Return home without saving: </h3>'
    content += '<button id="gohome" class="btn btn-danger responsive-btn">'
    content += 'No Thanks'
    content += '</button>'
    content += '</div>';
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    /*
    mins = timediff.getMinutes()
    secs = timediff.getSeconds()
    console.log(mins + ':' + secs)
    */
    document.getElementById('gohome').addEventListener('click', async function(event){
        home()
    })

    //let scoretime = mins + ':' + rem

    /*Auth0 login code*/
    /*
    function getRandomBytes(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
    */
    var loginBtn = document.getElementById('btn-login');
      
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        data = 'name=' + document.getElementById('name').value +'%score=' + scoreval + '%time=' + seconds
        console.log('LOGIN')
        /*
        var webAuth = new auth0.WebAuth({
            domain: 'dev-3vwxnh5c.auth0.com',
            clientID: '3ftlZ2VGXN7TfR08Fw4c36m495DcKuI4',
            responseType: 'token id_token',
            scope: 'openid',
            redirectUri: window.location.href + '?' + data //Add POST request address here? and move this stuff back
        
        });
        */
        //const state = getRandomBytes(32); // Assume that this method will give you 32 bytes
        const state = document.getElementById('name').value + '.' + scoreval + '.' + seconds
        localStorage[state] = { data: '/somepath' };
        webAuth.authorize({
            state: state
        });
        console.log(state)
        /*
        webAuth.authorize( {
            
            appState: {
                name: document.getElementById('name').value, 
                score: scoreval, 
                time: seconds
            }
            
        });
        sleep(10000)
        */

        /*
        localStorage.setItem(data, document.getElementById('name').value + scoreval + seconds)
        console.log(data)
        console.log(localStorage.getItem(data))
        /*
        let obj = {
            table: []
        };
        obj.table.push({Name: document.getElementById('name').value, Score: scoreval, Time: seconds});

        let json = JSON.stringify(obj);
        const fs = require('fs');
        fs.writeFile('data.json', json, 'utf8', callback); 
        */


    });    

}
async function sendResult(result) {
    /*
    let pos1 = result.indexOf('%');
    let name = result.slice(0, pos1)
    let pos2 = result.indexOf('%',pos1 + 1)
    let score = result.slice(pos1 + 1,pos2)
    let time = result.slice(pos2 + 1)
    console.log(name)
    console.log(score)
    console.log(time)
    */
    console.log(result)
    try {
        let response = await fetch('http://127.0.01:8090/result',
        {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "result=" + result
        });
        if(!response.ok){
            throw new Error("problem sending results" + response.code);
          }
        
    }
    catch (error) {
    alert ("problem: " + error);
    }


}
async function home() {
    console.log("I'm here")
    let response = '<div class="jumbotron">';
    response += '<h1>Flag Quiz</h1>';
    response += '<p>Test your vexillological knowledge!</p>';
    response += '</div>';
    response += '<div class="wrapper">';
    response += '<div class="sliding-background"></div>';
    response += '</div>';
    document.getElementById('title').innerHTML = ''
    document.getElementById('content').innerHTML = response;
}


document.getElementById('leaderboard').addEventListener('click', async function(event){
    let content = '<div class = "title">';
    content += '<div class = "heading"'
    content += '<h2> The Leaderboard: </h2>';
    content += '</div>';
    document.getElementById('title').innerHTML = content;
    document.getElementById('content').innerHTML = '';
    try {
        let response = await fetch('http://127.0.01:8090/scores',
        {
        method: "GET",
        });
        if(response.ok){
            let body = await response.text();
            console.log('Testing')
            console.log(body)
            console.log(body[2])
            let parse = JSON.parse(body)
            console.log(parse[2])
            console.log(parse[2].Rank)
            let content = '<div class = "title">';
            content += '<table class="leadertable">';
            content += '<tr>';
            content += '<td><h3> Rank: </h3></td>';
            content += '<td><h3> Name: </h3></td>'; 
            content += '<td><h3> Score (/20): </h3></td>';
            content += '<td><h3> Time (mins:secs): </h3></td>';
            content += '</tr>';
            for (i = 0; i < parse.length; i++) {
                //let minutes = parse[i].Time/60
                //let remSecs = seconds - (minutes * 60)
                let mins = Math.floor(parse[i].Time/60);
                let rem = Math.floor(parse[i].Time % 60);
                if (rem.toString().length == 1) {
                    rem = '0' + rem.toString()
                }
                content += '<tr>'
                content += '<td><h4>' + parse[i].Rank + '</h4></td>'
                content += '<td><h4>' + parse[i].Name + '</h4></td>'
                content += '<td><h4>' + parse[i].Score + '</h4></td>'
                content += '<td><h4>' + mins + ':' + rem + '</h4></td>'
                content += '</tr>'
            }
            content += '</table>'
            content += '</div>'
            document.getElementById('content').innerHTML = content;


        }
        else {
            throw new Error("problem getting scores" + response.code);
        }
        
    }
    catch (error) {
        alert ("problem: " + error);
    }



})

document.getElementById('home').addEventListener('click', async function(event){
    console.log("I'm here")
    home()
    /*
    let response = '<div class="jumbotron">';
    response += '<h1>Flag Quiz</h1>';
    response += '<p>Test your vexillological knowledge!</p>';
    response += '</div>';
    response += '<div class="wrapper">';
    response += '<div class="sliding-background"></div>';
    response += '</div>';
    document.getElementById('title').innerHTML = ''
    document.getElementById('content').innerHTML = response;
    */
})

/*var data;*/
var idToken;
var accessToken;
var expiresAt;

var webAuth = new auth0.WebAuth({
    domain: 'dev-3vwxnh5c.auth0.com',
    clientID: '3ftlZ2VGXN7TfR08Fw4c36m495DcKuI4',
    responseType: 'token id_token',
    scope: 'openid',
    redirectUri: window.location.href // + '?' + data //Add POST request address here? and move this stuff back
});

window.addEventListener('load', function() {
    /*
    function isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        console.log('isAuth')
        var expiration = parseInt(expiresAt) || 0;
        return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
    }
    */
    function handleAuthentication() {
        console.log('handleAuth')
        webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            localLogin(authResult);
        } else if (err) {
            console.log(err);
            alert(
            'Error: ' + err.error + '. Check the console for further details.'
            );
        }
        });
    }
    function localLogin(authResult) {
        console.log('localLogin')
        //
        /*const authRes = webAuth.parseHash();*/
        const state = authResult.state;
        console.log(state)
        sendResult(state)
        const olderAppState = localStorage[state];
        console.log(olderAppState)
        //localStorage.remove(state);
        //
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Set the time that the access token will expire at
        expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
        );
        accessToken = authResult.accessToken;
        idToken = authResult.idToken;

    } 
    console.log('Here')
    handleAuthentication()
    /*
    console.log(data)
    console.log(localStorage.getItem(data))
    console.log(name)
    console.log(score)
    console.log(time)
    /*
    if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log('LOGGED IN')
    }
    if (isAuthenticated()) {
        console.log('You are logged in!');
    }
    */
})
/*
window.addEventListener('load', function() {
    console.log('AUTH')
    var idToken;
    var accessToken;
    var expiresAt;
  
    var webAuth = new auth0.WebAuth({
        domain: 'dev-3vwxnh5c.auth0.com',
        clientID: '3ftlZ2VGXN7TfR08Fw4c36m495DcKuI4',
        responseType: 'token id_token',
        scope: 'openid',
        redirectUri: window.location.href
    });
  
    var loginBtn = document.getElementById('btn-login');
  
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        webAuth.authorize();
        console.log('LOGIN')
    });

    var loginStatus = document.querySelector('.container h4');
    var loginView = document.getElementById('login-view');
    var homeView = document.getElementById('home-view');

    // buttons and event listeners
    var homeViewBtn = document.getElementById('btn-home-view');
    var loginBtn = document.getElementById('btn-login');
    var logoutBtn = document.getElementById('btn-logout');

    homeViewBtn.addEventListener('click', function() {
        homeView.style.display = 'inline-block';
        loginView.style.display = 'none';
    });

    logoutBtn.addEventListener('click', logout);

    function handleAuthentication() {
        webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            localLogin(authResult);
            loginBtn.style.display = 'none';
            homeView.style.display = 'inline-block';
        } else if (err) {
            homeView.style.display = 'inline-block';
            console.log(err);
            alert(
            'Error: ' + err.error + '. Check the console for further details.'
            );
        }
        displayButtons();
        });
    }

    function localLogin(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Set the time that the access token will expire at
        expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
        );
        accessToken = authResult.accessToken;
        idToken = authResult.idToken;
    } 

    function renewTokens() {
        webAuth.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            localLogin(authResult);
        } else if (err) {
            alert(
            'Could not get a new token '  + err.error + ':' + err.error_description + '.'
            );
            logout();
        }
        displayButtons();
        });
    }

    function logout() {
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        // Remove tokens and expiry time
        accessToken = '';
        idToken = '';
        expiresAt = 0;
        displayButtons();
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        var expiration = parseInt(expiresAt) || 0;
        return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
    }

    function displayButtons() {
        if (isAuthenticated()) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            loginStatus.innerHTML = 'You are logged in!';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            loginStatus.innerHTML =
            'You are not logged in! Please log in to continue.';
        }
    }
    if (localStorage.getItem('isLoggedIn') === 'true') {
        renewTokens();
    } else {
        handleAuthentication();
    }
});
  


/**/

/*$('.nav navbar-nav navbar-right').on('click', 'a', function(e){
  
    // 'this' is the clicked anchor
    
    var text = this.text;
    var href = this.href;
    
    alert(text);
});*/