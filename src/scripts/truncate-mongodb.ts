import dotenv from 'dotenv';

dotenv.config({
  path: `${process.cwd()}/.env`,
});

import mongoose from 'mongoose';
import { AuthUsers } from '../admin/constants/authUsers.js';
import {
  CustomerModel,
  EmployeeModel,
  InvoiceModel,
  TaskModel,
  InvoiceDetailModel,
  ServiceModel,
} from '../sources/mongoose/models/index.js';

async function truncateMongodb() {
  await mongoose.connect(process.env.MONGO_DATABASE_URL);
  await CustomerModel.deleteMany({});
  await EmployeeModel.deleteMany({});
  await InvoiceModel.deleteMany({});
  await TaskModel.deleteMany({});
  await InvoiceDetailModel.deleteMany({});
  await ServiceModel.deleteMany({});
}

truncateMongodb()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
