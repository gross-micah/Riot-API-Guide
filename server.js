var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//var bodyParser = require('body-parser');
var request = require('request');
var async = require('async');

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', Number(process.env.PORT || 3000));

app.get("/", function(req, res){
  res.render('home');
});

app.get('/search',function(req,res){
  var data = {};
  var api_key = 'RGAPI-0d32ab4f-6f00-46c5-9242-7c13bef2b141';
  var summonerName = req.query.summoner.toLowerCase();

  var URL = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var jsonData = JSON.parse(body);
          data.id = jsonData[summonerName].id;
          data.name = jsonData[summonerName].name;
          data.level = jsonData[summonerName].summonerLevel
          data.revisionDate = jsonData[summonerName].revisionDate;
          callback(null, data);
        }
        else {
          console.log(err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    res.render('home', {data});
  });
});




app.get('/formshw',function(req,res){
  var passedData = [];
  for (var d in req.query){
    passedData.push({'name':d,'value':req.query[d]})
  }
  var context = {};
  context.infoDump = passedData;
  res.render('gethw', context);
});

app.post('/formshw', function(req,res){
  var passedData = [];
  for (var d in req.body){
    passedData.push({'name':d,'value':req.body[d]})
  }
  var context = {};
  context.infoDump = passedData;
  res.render('posthw', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
