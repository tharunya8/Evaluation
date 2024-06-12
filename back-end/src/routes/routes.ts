import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import EmployeeController from "../controllers/employee";
import { resourceLimits } from "worker_threads";

const employeeController = new EmployeeController();

router.post("/login", employeeController.LoginEmployee);
router.post("/employees", employeeController.getEmployees);

module.exports.route = router;
