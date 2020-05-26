// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require('body-parser');  

var listTodos = [{id: 1, q: 'Đi chợ'},
                {id: 2, q: 'Nấu ăn'},
                {id: 3, q: 'Học code tại CodersX'}];

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/todos", (request, response) => {
  response.render('index', {
    listTodo: listTodos
  })
});

app.get("/todos/search", (req, res) => {
    var q = req.query.q;
    var matchedTodos = listTodos.filter(function(a) {
      return a.q.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("index", {
    listTodo: matchedTodos
  });
});

app.post("/todos/create", (req, res) => {
    listTodos.push(req.body);
    res.redirect('/todos');
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
