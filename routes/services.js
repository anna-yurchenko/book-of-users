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

router.put('/editService', function(req, res){
    const servicesJson = JSON.parse(fs.readFileSync('./db/services.json', 'utf-8'));
    let id = req.body.id;
    let currentService = {};
    let service = servicesJson.services;
    for(let i=0; i<service.length; i++){
        if(service[i].id == id){
            currentService.title = service[i].title;
            currentService.userid = service[i].userid;
            currentService.description = service[i].description;
            currentService.time = service[i].time;

            var updatedService = req.body;
            for(let key in currentService){
                if(!(key in updatedService)){
                    updatedService[key] = currentService[key];
                }
            }
            service[i] = updatedService;
        }
    }
    servicesJson.services = service;
    
    fs.writeFileSync('./db/services.json', JSON.stringify(servicesJson));
    return res.json(servicesJson);
})

module.exports = router;
