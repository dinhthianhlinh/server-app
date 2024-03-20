import { model, Schema } from 'mongoose';

export interface Customer {
  fullName: string;
  phone: string;
  address: string;
}

export const CustomerSchema = new Schema<Customer>({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const CustomerModel = model<Customer>('Customer', CustomerSchema);
