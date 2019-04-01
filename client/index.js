
document.getElementById('new').addEventListener('click', async function(event){
    var seconds = 0, minutes = 0, hours = 0;
    let content = '<div class="topContainer">';
    content += '<h1><time>00:00:00</time></h1>';
    content += '</div>';
    document.getElementById('content').innerHTML = content;
    var h1 = document.getElementsByTagName('h1')[0];
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
        h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer()
    }
    function timer() {
        t = setTimeout(add, 1000);
    }
    timer();
})



document.getElementById('newflag').addEventListener('click', async function(event){
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
            console.log(body)
            /*let flagJSON = JSON.parse(body);
            console.log(flagJSON)*/
            let content = '<div class="flagContainer">'
            content += '<img height="300" src=' + body + '>';
            content += '</div>';
            document.getElementById('content').innerHTML = content
            /*alert(body)*/
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
});
document.getElementById('home').addEventListener('click', async function(event){
    let response = '<div class="jumbotron">';
    response += '<h1>Flag Quiz</h1>';
    response += '<p>Test your vexillological knowledge!</p>';
    response += '</div>';
    response += '<div class="wrapper">';
    response += '<div class="sliding-background"></div>';
    response += '</div>';
    document.getElementById('content').innerHTML = response;
})


/*$('.nav navbar-nav navbar-right').on('click', 'a', function(e){
  
    // 'this' is the clicked anchor
    
    var text = this.text;
    var href = this.href;
    
    alert(text);
});*/