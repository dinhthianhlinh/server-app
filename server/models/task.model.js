var { Schema, model, Types } = require('mongoose');

const Task = new Schema({
    name: { type: 'String', required: true },
    description: { type: 'String', required: true },
    start_date: { type: 'Date', required: true },
    end_date: { type: 'Date', required: true },
    status: { type: 'Number', required: true },
    employee_id: { type: Types.ObjectId, ref: 'Employees', required: true },
}, { timestamps: true });

module.exports = model('Tasks', Task);