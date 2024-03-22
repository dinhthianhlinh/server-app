var express = require('express');
var router = express.Router();

var Invoice = require('../../models/invoice.model')

// get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice by id
router.get('/:id', getInvoice, (req, res) => {
    res.json(res.invoice);
});

// create invoice
router.post('/create', async (req, res) => {
    const invoice = new Invoice({
        customer_id: req.body.customer_id,
        service_id: req.body.service_id,
        invoice_date: req.body.invoice_date,
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update invoice
router.patch('/:id', getInvoice, async (req, res) => {
    if (req.body.customer_id != null) {
        res.invoice.customer_id = req.body.customer_id;
    }
    if (req.body.service_id != null) {
        res.invoice.service_id = req.body.service_id;
    }
    if (req.body.invoice_date != null) {
        res.invoice.invoice_date = req.body.invoice_date;
    }
    try {
        const updatedInvoice = await res.invoice.save();
        res.json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete invoice
router.delete('/:id', getInvoice, async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted invoice' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getInvoice(req, res, next) {
    let invoice;
    try {
        invoice = await Invoice.findById(req.params.id);
        if (invoice == null) {
            return res.status(404).json({ message: 'Cannot find invoice' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.invoice = invoice;
    next();
}

module.exports = router;