const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const axios = require("axios");

const apiKey = "a9c8fa09730cebae1c4dc8b883468c4e";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios
    .get(url)
    .then((response) => {
      let weather = response.data;
      let weatherResponse = `It's ${weather.main.temp} degrees fahrenheit in ${weather.name}`;
      res.render("index", { weather: weatherResponse, error: null });
    })
    .catch((error) => {
      res.render("index", { weather: null, error: "Error, please try again" });
    });
});

app.listen(port, (error) => {
  if (!error) console.log(`Server is running on port ${port}`);
  else console.log("Error: ", error);
});
