const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log("Server is running at port 3000.");
});


//'res' parameter is the response from our server to the client server.
//whereas 'response' parameter is the response from API server to our server
app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    const cityName = req.body.city;
    const apiKey = "917d96819d5fc0a46884f234d7047670";
    const units = "metric";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+units;
    https.get(apiURL, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            //    console.log(data); - will log the data in Hexadecimal format
            /* const obj = {
                name : "Sanish",
                hobby : "Playing"
            }
            console.log(JSON.stringify(obj)); */ //To convert object to string

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherCon = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<html>");
            res.write("<img src="+iconURL+">");
            res.write("<h2> The weather condition currently is : "+weatherCon+" </h2>");
            res.write("<h1> The temperature in "+cityName+" is : "+temp+" degree Celcius. </h1>");
            res.write("</html>");
            res.send();


            
        });
    });
    // res.send("Server is up and running.");
});