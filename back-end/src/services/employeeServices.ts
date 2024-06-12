import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Redis from "ioredis";
import { findAllActiveEmployees, findByUserId } from "../models/employee";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_SERVER_IP,
  port: parseInt(process.env.REDIS_SERVER_PORT as string),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_SERVER_DEFAULT_DB as string),
});

export default class EmployeeService {
  async loginEmployee(data: any) {
    try {
      let { email, password } = data;
      email = (email as string).toLowerCase();
      const employee = await findByUserId(email);

      if (employee) {
        if (employee?.password !== password) {
          throw new Error("Password is incorrect");
        }
      } else {
        throw new Error("Employee not found");
      }

      // Create JWT token
      const token = jwt.sign(
        { email: employee.email, emp_id: employee.emp_id },
        "evaluation_task" // Replace with your actual secret key
      );

      // Store token in Redis
      await redis.set(
        `Employee_token_${employee.emp_id}`,
        JSON.stringify({
          email: employee.email,
          emp_id: employee.emp_id,
          token: token,
        }),
        "EX",
        86400000
      );

      return { employee, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getEmployees(token: string) {
    try {
      const decodedToken: any = jwt.verify(token, "evaluation_task");
      const storedToken: any = await redis.get(
        `Employee_token_${decodedToken.emp_id}`
      );
      if (!storedToken) {
        throw new Error("Token not found in Redis");
      }
      const storeData = JSON.parse(storedToken);
      if (token == storeData?.token) {
        const employees = await findAllActiveEmployees();
        return employees;
      } else {
        throw new Error("Redis Token mismatch!");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
