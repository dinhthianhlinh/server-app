var { Schema, model } = require('mongoose');

const Customer = new Schema({
    fullName: { type: 'String', required: true },
    phone: { type: 'String', required: true },
    address: { type: 'String', required: true },
})

module.exports = model('Customers', Customer);