var { Schema, model, Types } = require('mongoose');

const Invoice = new Schema({
    customer_id: { type: Types.ObjectId, ref: 'Customers' },
    service_id: { type: Types.ObjectId, ref: 'Services' },
    invoice_date: { type: 'Date', required: true },
}, { timestamps: true });

module.exports = model('Invoices', Invoice);