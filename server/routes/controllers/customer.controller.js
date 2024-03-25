var express = require('express');
var router = express.Router();
var Invoice = require('../../models/invoice.model');

var Customer = require('../../models/customer.model')
const authenticateToken = require('./authentication.controller')
// get all customers
router.get('/', authenticateToken, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get customer by id
router.get('/:id', authenticateToken, getCustomer, (req, res) => {
    res.json(res.customer);
});

// create customer
router.post('/create', authenticateToken, async (req, res) => {
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
router.patch('/:id', authenticateToken, getCustomer, async (req, res) => {
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
router.delete('/:id', authenticateToken, getCustomer, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted customer' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getCustomer(req, res, next) {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' });
        }
        res.customer = customer;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
// get all invoices of a customer
router.get('/:id/invoices', authenticateToken, async (req, res) => {
    try {
        const invoices = await Invoice.find({ customer_id: req.params.id });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;