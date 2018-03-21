require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    checkForSession = require('./middlewares/checkForSession'),
    authCtrl = require('./controllers/auth_controller'),
    swagCtrl = require('./controllers/swag_controller');



const app = express();
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret:process.env.SESSION_SECRET,
}))

app.use( (req, res, next) => {
    checkForSession( req, res, next)
})

app.get('/api/swag', swagCtrl.read);

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser)

const port = process.env.PORT || 3010;
app.listen(port, ()=> console.log(`Port ${port} is on fire!`))
