const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/createNewService', function(req, res){
    const servicesJson = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'))
    let services = servicesJson.services;

    let newService = {};
    let newId = Math.random().toString();
    newService.id = Number(newId.slice(2));
    newService.title = req.body.title;
    newService.userid = req.body.userid;
    newService.description = req.body.description;
    newService.time = req.body.time;

    services.push(newService);
    servicesJson.services = services;
    fs.writeFileSync('./db/services.json', JSON.stringify(servicesJson));
    return res.json(services);
})

router.get('/allServices', function(req, res){
    const servicesJson = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'))
    return res.json(servicesJson)
})

router.delete('/:id', function(req, res){
    const servicesJson = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'))
    let services = servicesJson.services;
    let id = req.params.id.toString();
    servicesJson.services = services.filter(u => u.id.toString() !== id)

    fs.writeFileSync('./db/services.json', JSON.stringify(servicesJson));
    return res.json(servicesJson.services);
})

module.exports = router;
