var { Schema, model, Types } = require('mongoose');

const Service = new Schema({
    name: { type: 'String', required: true },
    description: { type: 'String', required: true },
    status: { type: 'Boolean', required: true },
    price: { type: 'Number', required: true },
}, { timestamps: true });

module.exports = model('Services', Service);