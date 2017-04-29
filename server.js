//Primary variables and dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

//Require routing paths for html and api pages
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

//Open server connection
app.listen(PORT, () => {
	console.log("Application listening on port " + PORT);
});