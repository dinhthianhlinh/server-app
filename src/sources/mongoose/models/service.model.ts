import { model, Schema, Types } from 'mongoose';

export interface Service {
  name: string;
  description: string;
  status: boolean;
  price: number;
}

export const ServiceSchema = new Schema<Service>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ServiceModel = model<Service>('Service', ServiceSchema);
