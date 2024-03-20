import { model, Schema, Types } from 'mongoose';

export interface Task {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  employee_id: Types.ObjectId;
}

export const TaskSchema = new Schema<Task>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    employee_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = model<Task>('Task', TaskSchema);
