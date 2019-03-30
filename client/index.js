
document.getElementById('new').addEventListener('click', async function(event){
    /*let response = ['response'];
    document.getElementById('content').innerHTML = response;*/
    console.log('fetching now')
    let response = await fetch('http://127.0.0.1:8090/randflag',
    {
      method: "GET"
    });

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