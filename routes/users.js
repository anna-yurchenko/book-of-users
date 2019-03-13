const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/createNewUser', function(req, res){
    const usersJson = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
    let users = usersJson.users;

    let newUser = {};
    let newId = Math.random().toString();
    newUser.id = Number(newId.slice(2));
    newUser.name = req.body.name;
    newUser.city = req.body.city;

    users.push(newUser);
    usersJson.users = users;
    fs.writeFileSync('./db/users.json', JSON.stringify(usersJson));
    return res.json(users);
})

router.get('/allUsers', function(req, res){
    const usersJson = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
    return res.json(usersJson)
})

router.delete('/:id', function(req, res){
    const usersJson = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'))
    let users = usersJson.users;
    let id = req.params.id.toString();
    usersJson.users = users.filter(u => u.id.toString() !== id)

    fs.writeFileSync('./db/users.json', JSON.stringify(usersJson));
    return res.json(usersJson.users);
})

router.put('/editUser', function(req, res){
    const usersJson = JSON.parse(fs.readFileSync('./db/users.json', 'utf-8'));
    let id = req.body.id;
    let currentUser = {};
    let user = usersJson.users;
    for(let i=0; i<user.length; i++){
        if(user[i].id == id){
            currentUser.name = user[i].name;
            currentUser.city = user[i].city;
        }
    }
    let newData = req.body;
    let updatedUser = {};
    for (let key in currentUser){
        if(currentUser[key] != newData[key]){
            updatedUser[key] = newData[key]
        }
        else{
            updatedUser[key] = currentUser[key]
        }
    }
    return res.json(updatedUser);
})

module.exports = router;