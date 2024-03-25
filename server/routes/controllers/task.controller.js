var express = require('express');
var router = express.Router();
const unidecode = require('unidecode');

var Task = require('../../models/task.model')
const authenticateToken = require('./authentication.controller')
// get all tasks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get task by id
router.get('/:id', authenticateToken, getTask, (req, res) => {
    res.json(res.task);
});

// create task
router.post('/create', authenticateToken, async (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        status: req.body.status,
        employee_id: req.body.employee_id
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update task
router.patch('/:id', authenticateToken, getTask, async (req, res) => {
    if (req.body.name != null) {
        res.task.name = req.body.name;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.start_date != null) {
        res.task.start_date = req.body.start_date;
    }
    if (req.body.end_date != null) {
        res.task.end_date = req.body.end_date;
    }
    if (req.body.status != null) {
        res.task.status = req.body.status;
    }
    if (req.body.employee_id != null) {
        res.task.employee_id = req.body.employee_id;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete task
router.delete('/:id', authenticateToken, getTask, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted task' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get tasks by employee id
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ employee_id: req.params.employeeId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.task = task;
    next();
}

// search tasks of employee by name
router.get('/employee/:employeeId/search', authenticateToken, async (req, res) => {
    try {
        const searchName = unidecode(req.query.name).toLowerCase();
        const tasks = await Task.find({ employee_id: req.params.employeeId });
        const matchedTasks = tasks.filter(task => unidecode(task.name).toLowerCase().includes(searchName));
        res.json(matchedTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;