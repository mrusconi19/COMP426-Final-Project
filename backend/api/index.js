const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// -----------------Login backend-----------------

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const expressSession = require('express-session');

app.use(expressSession({
  name: "mvrSessionCookie",
  secret: "Cooper is my lovely dog",
  resave: false,
  saveUninitialized: false
}));

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.post('/login', (req,res) => {

  let user = req.body.user;
  let password = req.body.password;

  let user_data = login_data.get(user);
  if (user_data == null) {
      res.status(404).send("Not found");
      return;
  }
  if (user_data.password == password) {
      console.log("User " + user + " credentials valid");
      req.session.user = user;
      res.json(true);
      return;
  }
  res.status(403).send("Unauthorized");
});

// ------------------------------------------------

const getJobs = require('./get-Github-jobs');

// Local app.get:
app.get('/jobs', async (req, res) => {

  const jobs = await getJobs();
  //console.log(JSON.parse(jobs).length);
  //res.send('Hello World!');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  return res.send(jobs)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})