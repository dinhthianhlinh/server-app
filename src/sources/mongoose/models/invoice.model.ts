import { model, Schema, Types } from 'mongoose';

export interface Invoice {
  customer_id: Types.ObjectId;
  service_id: Types.ObjectId;
  invoice_date: Date;
}

export const InvoiceSchema = new Schema<Invoice>(
  {
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
    service_id: { type: Schema.Types.ObjectId, ref: 'Service' },
    invoice_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const InvoiceModel = model<Invoice>('Invoice', InvoiceSchema);
