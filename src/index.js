// imports
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override")
const connect = require('./config/database');
const indexRouter = require('./router/index');
const todoRouter = require('./router/todo');
require("dotenv").config()

 
// configs
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride("_method"));


// routes
app.use('/', indexRouter)
app.use('/todo', todoRouter)

connect(process.env.MONGO_URI);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
