var { Schema, model } = require('mongoose');

const Employee = new Schema({
    fullName: { type: 'String', required: true },
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    role: { type: 'Boolean', required: true },
    phone: { type: 'String', required: true },
})

module.exports = model('Employees', Employee);