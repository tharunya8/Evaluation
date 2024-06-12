import { Request, Response } from "express";
import EmployeeService from "../services/employeeServices";

const employeeService = new EmployeeService();

export default class EmployeeController {
  async LoginEmployee(req: Request, res: Response): Promise<void> {
    try {
      let { email, password } = req.body;
      email = (email as string).toLowerCase();
      const userData = {
        email,
        password,
      };
      await employeeService
        .loginEmployee(userData)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error: any) => {
          res.status(400).send(error.message);
        });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).send("Authorization token is required");
        return;
      }

      await employeeService
        .getEmployees(token)
        .then((data: any) => {
          res.status(200).json(data);
        })
        .catch((error: any) => {
          res.status(400).send(error.message);
        });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
