//imports
import express from "express";
import { connectToMongodb } from "./db/db";
const routes = require("./routes/routes");
import cors from "cors";

//initialise the express to start server
const app = express();

//port number called from env file
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", routes.route);

//connection to trigger the mongodb (call)
connectToMongodb()
  .then(() => {
    console.log("Mongodb connected sucessfully");
  })
  .catch((error) => {
    console.log("Error connecting to Mongodb:", error);
  });

//function for running the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
