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
    content += '<td><h2 id="q"> Question: 1/20 </h2></td>';
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
                content += '<td id="correct-outer"><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                content += '<td id="wrong-outer1"><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                content += '</tr>'
                content += '<tr>'
                content += '<td id="wrong-outer2"><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                content += '<td id="wrong-outer3"><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
                
            }
            else if (rand == 2){
                content += '<td id="wrong-outer1"><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                content += '<td id="correct-outer"><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                content += '</tr>'
                content += '<tr>'
                content += '<td id="wrong-outer2"><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                content += '<td id="wrong-outer3"><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
            }
            else if (rand == 3){
                content += '<td id="wrong-outer1"><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                content += '<td id="wrong-outer2"><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[3] + '</button></td>'
                content += '</tr>'
                content += '<tr>'
                content += '<td id="correct-outer"><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
                content += '<td id="wrong-outer3"><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[4] + '</button></td>'
            }
            else if (rand == 4){
                content += '<td id="wrong-outer1"><button class="btn btn-danger responsive-btn" id="wrong">' + parse[2] + '</button></td>'
                content += '<td id="wrong-outer2"><button class="btn btn-danger responsive-btn" id="wrong2">' + parse[4] + '</button></td>'
                content += '</tr>'
                content += '<tr>'
                content += '<td id="wrong-outer3"><button class="btn btn-danger responsive-btn" id="wrong3">' + parse[3] + '</button></td>'
                content += '<td id="correct-outer"><button class="btn btn-danger responsive-btn" id="correct">' + parse[1] + '</button></td>'
            }
            content += '</tr>'
            content += '</table>'
            content += '</div>'
            console.log(content)
            let working = false
            document.getElementById('content').innerHTML = content
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
                    let question = document.getElementById('q').innerHTML;
                    let qnumber = question.substr(11,2);
                    let qnumberint = parseInt(qnumber, 10);
                    qnumberint += 1
                    console.log(question)
                    console.log(qnumber)
                    console.log(qnumberint)
                    document.getElementById('q').innerHTML = ' Question: '+ qnumberint + '/20'
                    /*
                    let correct = document.getElementById('correct').innerHTML
                    document.getElementById('correct').innerHTML = '<span style="background-color:green;">' + correct + '</span>' 
                    document.getElementById('wrong').innerHTML += '<style="color:red;">'
                    */
                    let correct = document.getElementById('correct').innerHTML
                    console.log(correct)
                    if (qnumberint < 21){
                        sleep(2000).then(() => {newFlag(time)});
                    }
                }
            })
            function wrong(){
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

document.getElementById('home').addEventListener('click', async function(event){
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
})


/*$('.nav navbar-nav navbar-right').on('click', 'a', function(e){
  
    // 'this' is the clicked anchor
    
    var text = this.text;
    var href = this.href;
    
    alert(text);
});*/