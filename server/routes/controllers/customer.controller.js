var express = require('express');
var router = express.Router();

var Customer = require('../../models/customer.model')

// get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get customer by id
router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer);
});

// create customer
router.post('/create', async (req, res) => {
    const customer = new Customer({
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address
    });

    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update customer
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.fullName != null) {
        res.customer.fullName = req.body.fullName;
    }
    if (req.body.phone != null) {
        res.customer.phone = req.body.phone;
    }
    if (req.body.address != null) {
        res.customer.address = req.body.address;
    }
    try {
        const updatedCustomer = await res.customer.save();
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete customer
router.delete('/:id', getCustomer, async (req, res) => {
    try {
        await res.customer.remove();
        res.json({ message: 'Deleted customer' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;