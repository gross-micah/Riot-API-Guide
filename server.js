var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request');
var async = require('async');

app.use('/css', express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', Number(process.env.PORT || 3000));

app.get("/", function(req, res){
  res.render('home');
});

app.get("/retrieve", function(req, res){
  res.render('retrieving');
});

app.get("/combo", function(req, res){
  res.render('combo');
});


app.get('/search',function(req,res){
  var data = {};
  var api_key = 'RGAPI-0d32ab4f-6f00-46c5-9242-7c13bef2b141';
  var summonerName = 'mulgokizary';
  var URL = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        jsonData = JSON.parse(body);
        if(jsonData != null) {
          data.id = jsonData[summonerName].id;
          data.name = jsonData[summonerName].name;
          data.level = jsonData[summonerName].summonerLevel;
          callback(null, data);
        }
        else
        {
          console.log(err);
        }
      });
    },
    function (data, callback) {
      var URL = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/29161654/summary?season=SEASON2017&api_key=RGAPI-0d32ab4f-6f00-46c5-9242-7c13bef2b141';
      request(URL, function(err, response, body) {
        jsonData = JSON.parse(body);
        if (jsonData !=null) {

          data.unranked = jsonData.playerStatSummaries[4].wins;
          data.win = jsonData['playerStatSummaries'][7].wins;
          data.loss = jsonData['playerStatSummaries'][7].losses;
          callback(null, data);
      }
      else
      {
        console.log('bad job chaining');
      }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    res.render('combo', {data});
  });
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
