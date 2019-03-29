
document.getElementById('new').addEventListener('click', async function(event){
    let response = ['response'];
    document.getElementById('content').innerHTML = response;

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