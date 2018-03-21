const users = require('../models/users');
let id = 1;
module.exports = {
    login: ( req, res, next) =>{
       const { username, password } = req.body;
       const {session} = req;
       const user = users.find( user =>  user.username === username && user.password === password  )
        // ? (req.session.user = user.username,
        //     res.status(200).send(user) )
        // : res.status(500);
        if (user){
            session.user.username = username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unauthorized')
        }


    },
    register:( req, res, next) => {
        const {username, password} = req.body;
        users.push({id, username, password});
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session)
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}