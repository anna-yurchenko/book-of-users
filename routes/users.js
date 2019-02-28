const express = require('express');
const fs = require('fs');

const router = express.Router();


// 1
router.post('/createNewUser', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    let users = usersJSON.users;
    let newUser = {};
    newUser.name = req.body.name;
    newUser.id = Math.random();
    newUser.city = req.body.city;
    users.push( newUser )
    usersJSON.users = users;
    fs.writeFileSync('./db/users.json', JSON.stringify( usersJSON ) );
    return res.json(users)
});

// 2
router.get('/allUsers', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    return res.json( usersJSON );
});

// 3
router.delete('/:id', function(req, res) {
    const usersJSON = JSON.parse( fs.readFileSync('./db/users.json', 'utf-8'))
    let users = usersJSON.users;
    let id = req.params.id.toString();

    usersJSON.users = users.filter(u => u.id.toString() !== id);

    fs.writeFileSync('./db/users.json', JSON.stringify( usersJSON ) );
    return res.json(usersJSON.users)
});

// 4
router.put('/', function (req, res) {
    // req.body.id should contain id of user for edit
    // all other parameters will be data that should be added
    // for example ---->>>> let {id, ...data} = req.body
    // after it you should get data from JSON
    // find user by id in this data
    // update fields (replace the value)
    // and save new data
    // don't forget about validation, etc
});

module.exports = router;