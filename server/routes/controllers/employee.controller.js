var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Employee = require('../../models/employee.model')

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

module.exports = router;