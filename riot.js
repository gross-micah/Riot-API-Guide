

document.getElementById('summonerSubmit').addEventListener('click', function(event){
  var req = new XMLHttpRequest();
  var apiKey = 'RGAPI-0d32ab4f-6f00-46c5-9242-7c13bef2b141';
  var search = document.getElementById('summoner').value;
  req.open('GET', 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + search + '?api_key=' + apiKey, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
       if(req.status >= 200 && req.status < 400){
         var response = JSON.parse(req.responseText);
         document.getElementById('resultsID').textContent = 'ID: ' + response.id;
         document.getElementById('resultsName').textContent = 'Name: ' + response.name;
       }
       else {
         console.log("Networking error: " + req.statusText);
       }});
  req.send(null);
});

document.getElementById('summoner').addEventListener('keypress', function(event){
  var key = event.which || event.keyCode;
  if (key === 13)
  {
    var req = new XMLHttpRequest();
    var apiKey = 'RGAPI-0d32ab4f-6f00-46c5-9242-7c13bef2b141';
    var search = document.getElementById('summoner').value;
    req.open('GET', 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + search + '?api_key=' + apiKey, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
         if(req.status >= 200 && req.status < 400){
           var response = JSON.parse(req.responseText);
           document.getElementById('resultsID').textContent = 'ID: ' + response.id;
           document.getElementById('resultsName').textContent = 'Name: ' + response.name;
         }
         else {
           console.log("Networking error: " + req.statusText);
         }});
    req.send(null);
  }
});
