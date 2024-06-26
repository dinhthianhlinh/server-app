var express = require('express');
var router = express.Router();

var Service = require('../../models/service.model')
const authenticateToken = require('./authentication.controller')
// get all services
router.get('/', authenticateToken, async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get service by id
router.get('/:id', authenticateToken, getService, (req, res) => {
    res.json(res.service);
});

// create service
router.post('/create', async (req, res) => {
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        price: req.body.price
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update service
router.patch('/:id', authenticateToken, getService, async (req, res) => {
    if (req.body.name != null) {
        res.service.name = req.body.name;
    }
    if (req.body.description != null) {
        res.service.description = req.body.description;
    }
    if (req.body.status != null) {
        res.service.status = req.body.status;
    }
    if (req.body.price != null) {
        res.service.price = req.body.price;
    }
    try {
        const updatedService = await res.service.save();
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete service
router.delete('/:id', authenticateToken, getService, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted service' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getService(req, res, next) {
    let service;
    try {
        service = await Service.findById(req.params.id);
        if (service == null) {
            return res.status(404).json({ message: 'Cannot find service' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.service = service;
    next();
}

module.exports = router;
