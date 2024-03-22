var express = require('express');
var router = express.Router();

var InvoiceDetail = require('../../models/invoice-detail.model')

// get all invoice details
router.get('/', async (req, res) => {
    try {
        const invoiceDetails = await InvoiceDetail.find();
        res.json(invoiceDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice detail by id
router.get('/:id', getInvoiceDetail, (req, res) => {
    res.json(res.invoiceDetail);
});

// create invoice detail
router.post('/create', async (req, res) => {
    const invoiceDetail = new InvoiceDetail({
        invoice_id: req.body.invoice_id,
        service_id: req.body.service_id,
        quantity: req.body.quantity,
        price: req.body.price
    });

    try {
        const newInvoiceDetail = await invoiceDetail.save();
        res.status(201).json(newInvoiceDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update invoice detail
router.patch('/:id', getInvoiceDetail, async (req, res) => {
    if (req.body.invoice_id != null) {
        res.invoiceDetail.invoice_id = req.body.invoice_id;
    }
    if (req.body.service_id != null) {
        res.invoiceDetail.service_id = req.body.service_id;
    }
    if (req.body.quantity != null) {
        res.invoiceDetail.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
        res.invoiceDetail.price = req.body.price;
    }
    try {
        const updatedInvoiceDetail = await res.invoiceDetail.save();
        res.json(updatedInvoiceDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete invoice detail
router.delete('/:id', getInvoiceDetail, async (req, res) => {
    try {
        await res.invoiceDetail.remove();
        res.json({ message: 'Deleted invoice detail' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;