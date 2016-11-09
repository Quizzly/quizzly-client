module.exports = {
  isWebsite() {
    var currentLocation = window.location.pathname;
    return currentLocation == "/";
  },
  localhost: "http://localhost:1337",
  prod: "https://quizzly-backend-prod.herokuapp.com",
};
