const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// ser hbs - npm module in express
app.set("view engine", "hbs");

//set the 'public'path to serve as Public folder
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//set the 'templates'path to serve as views of hbs (template handler)
const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);

//set the 'partials'path to serve common partials in another hbs
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "HomePage",
    name: "Swapnil",
    helpText: "This is Home page.",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HelpPage",
    name: "Swapnil",
    helpText: "This is help page.",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "AboutPage",
    name: "Swapnil",
    helpText: "This is about page.",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide Address Query in URL",
    });
  }

  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(long, lat, (error, forcastData = null) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forcastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide Search Query in URL",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "ErrorPage",
    name: "Swapnil",
    errorText: "Help Article Not Found.",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "ErrorPage",
    name: "Swapnil",
    errorText: "Page not Found.",
  });
});

app.listen(3000, () => {
  console.log("Starting Server");
});
