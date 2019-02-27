const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/test', function(req, res) {
    return res.json({ noDone: 'OK' });
});

router.post('/createNewUser', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    // 2. error handling
    // 2.validation for users array()
    let users = usersJSON.users;
    // 1. validation
    // 2. error handling
    let newUser = {};
    newUser.name = req.body.name;
    newUser.id = Math.random();
    newUser.city = req.body.city;
    users.push( newUser )
    usersJSON.users = users;
    fs.writeFileSync('./db/users.json', JSON.stringify( usersJSON ) );
    return res.json(users)
});

router.get('/allUsers', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    return res.json( usersJSON );
});

router.delete('/:id', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    let users = usersJSON.users;
    let id = req.params.id.toString();

    usersJSON.users = users.filter(u => u.id.toString() !== id);

    fs.writeFileSync('./db/users.json', JSON.stringify( usersJSON ) );
    return res.json(usersJSON.users)
});

module.exports = router;