import { model, Schema, Types } from 'mongoose';

const Task = new Schema({
    title: { type: 'String', required: true },
    description: { type: 'String', required: true },
    start_date: { type: 'Date', required: true },
    end_date: { type: 'Date', required: true },
    status: { type: 'Boolean', required: true },
    employee: { type: Types.ObjectId, ref: 'Employees' },
}, { timestamps: true });

module.exports = model('Tasks', Task);