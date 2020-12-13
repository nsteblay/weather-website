// Packages required for application
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Instantiate Express as app
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nicholas Steblay",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Nicholas Steblay",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Nicholas Steblay",
    message: "Some help message.",
  });
});

app.get("/weather", (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast (location, longitude, latitude, (error, {forecastSummary} = {}) => {
      if (error) {
        return res.send({error})
      }
      return res.send({
        forecast: forecastSummary,
        location,
        address: req.query.address,
      })
    })
  })
})

app.get("/products", (req, res) => {
  if (!req.query.key1) {
    return res.send({
      error: "You must provide a key 1 term!",
    });
  }

  console.log(req.query.key1);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "Help Page",
    name: "Nicholas Steblay",
    message: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "404 Error Page",
    name: "Nicholas Steblay",
    message: "404 Error - Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
