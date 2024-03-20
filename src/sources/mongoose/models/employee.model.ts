import { model, Schema } from 'mongoose';

export interface Employee {
  fullName: string;
  email: string;
  password: string;
  role: boolean;
  phone: string;
}

export const EmployeeSchema = new Schema<Employee>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
