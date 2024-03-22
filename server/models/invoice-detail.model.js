import { model, Schema, Types } from 'mongoose';
// invoice_id, service_id, quantity, price
const InvoiceDetail = new Schema({
    invoice_id: { type: Types.ObjectId, ref: 'Invoices' },
    service_id: { type: Types.ObjectId, ref: 'Services' },
    quantity: { type: 'Number', required: true },
    price: { type: 'Number', required: true },
}, { timestamps: true });

module.exports = model('InvoiceDetails', InvoiceDetail);