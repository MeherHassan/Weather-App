const express = require("express");
const app  = express();
const bodyParser = require("body-parser");
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=6cd6e8d65f9470ba5a2ac50ef4fbde37&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDesc = weatherData.weather[0].description
      const weatherIcon = weatherData.weather[0].icon

      const imageURL = "http://openweathermap.org/img/wn/"+ weatherIcon + "@2x.png"


      console.log(weatherDesc)
      res.write("<h1> The weather of "+ query+" is currently "+temp+" degree celcius</h1>")
      res.write("<p>Weather description: "+weatherDesc+"<img src="+imageURL+">");

      res.send();
    })
  })
})



app.listen(3000,function(){
  console.log("Server Side Working Properly");
});
