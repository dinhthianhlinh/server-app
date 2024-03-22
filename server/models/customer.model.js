import { model, Schema } from 'mongoose';
const Customer = new Schema({
    fullName: { type: 'String', required: true },
    phone: { type: 'String', required: true },
    address: { type: 'String', required: true },
})

model.exports = model('Customers', Customer);