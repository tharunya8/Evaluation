// Importing the mongoose library
import mongoose from "mongoose";

// Defining the schema
const Schema = mongoose.Schema;

// New schema model with updated fields
export const employeeSchema = new Schema({
  emp_id: {
    type: Number,
    required: true, // emp_id is mandatory
    unique: true,
  },
  emp_name: {
    type: String,
    required: true, // emp_name is mandatory
  },
  email: {
    type: String,
    required: true, // email is mandatory
  },
  password: {
    type: String,
    required: true, // password is mandatory
  },
  role: {
    type: String,
    required: true, // role is mandatory
  },
  department: {
    type: String,
    required: true, // department is mandatory
  },
  emp_status: {
    type: String,
    required: true, // emp_status is mandatory
  },
  joining_date: {
    type: Date,
    required: true, // joining_date is mandatory
  },
  created_by: {
    type: String,
    required: true, // created_by is mandatory
  },
  created_at: {
    type: Date,
    default: Date.now, // Default value for created_at is current date
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  update_by: {
    type: String,
  },
  updated_at: {
    type: Date,
    default: Date.now, // Default value for updated_at is current date
  },
});

// Create the Employee model from the schema
const Employee = mongoose.model("Employee", employeeSchema);

// Using in other components
export default Employee;

export const findByUserId = (email: string) =>
  Employee.findOne({ email })
    .then((userData: any) => {
      if (!userData) {
        return null;
      }
      return userData;
    })
    .catch((error: any) => {
      return null;
    });

export const findAllActiveEmployees = () =>
  Employee.find({ status: "Active" })
    .then((employees: any) => {
      if (!employees) {
        return [];
      }
      return employees;
    })
    .catch((error: any) => {
      return [];
    });
