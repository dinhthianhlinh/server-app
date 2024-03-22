var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Employee = require('../../models/employee.model')
const authenticateToken = require('./authentication.controller')

//check user exists 
router.get('/check-employee-exists/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const employee = await Employee.findOne({ email: email }).select('-password');
        if (employee) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    } catch (error) {

        res.status(500).json({ message: error.message });

    }
});

//get all employees
router.get('/', authenticateToken, authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find().select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get employee by id
router.get('/:id', authenticateToken, getEmployee, (req, res) => {
    res.json(res.employee);
});

//create employee
router.post('/create', async (req, res) => {
    const employee = new Employee({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        phone: req.body.phone
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update employee
router.patch('/:id', authenticateToken, getEmployee, async (req, res) => {
    if (req.body.fullName != null) {
        res.employee.fullName = req.body.fullName;
    }
    if (req.body.email != null) {
        res.employee.email = req.body.email;
    }
    if (req.body.password != null) {
        res.employee.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.role != null) {
        res.employee.role = req.body.role;
    }
    if (req.body.phone != null) {
        res.employee.phone = req.body.phone;
    }
    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete employee
router.delete('/:id', authenticateToken, getEmployee, async (req, res) => {
    try {
        await Employee.findByIdAndRemove(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            email: req.body.email
        });
        if (employee) {
            if (bcrypt.compareSync(req.body.password, employee.password)) {
                const token = jwt.sign({ id: employee._id },
                    process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                res.json({ token: token });
            }
            else {
                res.status(401).json({ message: 'Invalid password' });
            }
        }
        else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
        res.employee = employee;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = router;