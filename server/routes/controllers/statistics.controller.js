var express = require('express');
var router = express.Router();

var Task = require('../../models/task.model');
var Invoice = require('../../models/invoice.model');
var Employee = require('../../models/employee.model');
var Customer = require('../../models/customer.model');
var Service = require('../../models/service.model');
var InvoiceDetail = require('../../models/invoice-detail.model');

// get task statistics by status
router.get('/task-status', async (req, res) => {
    try {
        const stats = await Task.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get task statistics by employee
router.get('/task-employee', async (req, res) => {
    try {
        const stats = await Task.aggregate([
            {
                $group: {
                    _id: '$employee_id',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by status
router.get('/invoice-status', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by customer
router.get('/invoice-customer', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: '$customer_id',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by service
router.get('/invoice-service', async (req, res) => {
    try {
        const stats = await InvoiceDetail.aggregate([
            {
                $group: {
                    _id: '$service_id',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by employee
router.get('/invoice-employee', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: '$employee_id',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by month
router.get('/invoice-month', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $month: '$date' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by year
router.get('/invoice-year', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $year: '$date' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by quarter
router.get('/invoice-quarter', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $quarter: '$date' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by month and year
router.get('/invoice-month-year', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get invoice statistics by quarter and year
router.get('/invoice-quarter-year', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { quarter: { $quarter: '$date' }, year: { $year: '$date' } },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get income statistics by month
router.get('/income-month', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $month: '$date' },
                    income: { $sum: '$total' }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get income statistics by year
router.get('/income-year', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $year: '$date' },
                    income: { $sum: '$total' }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get income statistics by quarter
router.get('/income-quarter', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { $quarter: '$date' },
                    income: { $sum: '$total' }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get income statistics by month and year
router.get('/income-month-year', async (req, res) => {
    try {
        const stats = await Invoice.aggregate([
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    income: { $sum: '$total' }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;