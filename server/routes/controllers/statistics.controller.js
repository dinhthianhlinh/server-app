var express = require('express');
var router = express.Router();

var Task = require('../../models/task.model');
var Invoice = require('../../models/invoice.model');
var Employee = require('../../models/employee.model');
var Customer = require('../../models/customer.model');
var Service = require('../../models/service.model');
var InvoiceDetail = require('../../models/invoice-detail.model');

// get status array 1 2 3
router.get('/task/all/:id', async (req, res) => {
    try {
        const statuses = [1, 2, 3];
        const tasks = await Task.find({ employee_id: req.params.id, status: { $in: statuses } });
        const countByStatus = statuses.map(status => ({
            status: status,
            count: tasks.filter(task => task.status === status).length
        }));
        res.json(countByStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get task by id employee and status return count
router.get('/task/:id', async (req, res) => {
    try {
        const status = req.query.status;
        console.log(req.query.status);
        const task = await Task.find({ employee_id: req.params.id, status: status });
        res.json(task.length);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get revenue for the last 24 hours
router.get('/revenue/day', async (req, res) => {
    try {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const revenue = await InvoiceDetail.aggregate([
            { $match: { createdAt: { $gte: oneDayAgo } } },
            { $group: { _id: { $hour: "$createdAt" }, total: { $sum: { $multiply: ["$price", "$quantity"] } } } },
            { $sort: { _id: 1 } }
        ]);

        const totalRevenue = await InvoiceDetail.aggregate([
            { $match: { createdAt: { $gte: oneDayAgo } } },
            { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } }
        ]);

        res.json({ revenue: revenue.map(item => ({ hour: item._id, total: item.total })), totalRevenue: totalRevenue[0].total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get revenue for the last 7 days
router.get('/revenue/week', async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const revenue = await InvoiceDetail.aggregate([
            { $match: { createdAt: { $gte: oneWeekAgo } } },
            { $group: { _id: { $dayOfMonth: "$createdAt" }, total: { $sum: { $multiply: ["$price", "$quantity"] } } } },
            { $sort: { _id: 1 } }
        ]);

        const totalRevenue = await InvoiceDetail.aggregate([
            { $match: { createdAt: { $gte: oneWeekAgo } } },
            { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } }
        ]);

        res.json({ revenue: revenue.map(item => ({ day: item._id, total: item.total })), totalRevenue: totalRevenue[0].total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get monthly revenue
router.get('/revenue/month', async (req, res) => {
    try {
        const revenue = await InvoiceDetail.aggregate([
            { $group: { _id: { $month: "$createdAt" }, total: { $sum: { $multiply: ["$price", "$quantity"] } } } },
            { $sort: { _id: 1 } }
        ]);

        const totalRevenue = await InvoiceDetail.aggregate([
            { $group: { _id: null, total: { $sum: { $multiply: ["$price", "$quantity"] } } } }
        ]);

        res.json({ revenue: revenue.map(item => ({ month: item._id, total: item.total })), totalRevenue: totalRevenue[0].total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;