import { model, Schema, Types } from 'mongoose';

export interface InvoiceDetail {
  invoice_id: Types.ObjectId;
  service_id: Types.ObjectId;
  quantity: number;
  price: number;
}

export const InvoiceDetailSchema = new Schema<InvoiceDetail>(
  {
    invoice_id: { type: Schema.Types.ObjectId, ref: 'Invoice' },
    service_id: { type: Schema.Types.ObjectId, ref: 'Service' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const InvoiceDetailModel = model<InvoiceDetail>('InvoiceDetail', InvoiceDetailSchema);
