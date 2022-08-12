import express from "express";
import cors from "cors";
import db from "./src/config/database.js";
import { todoRouter } from "./src/routes/todo.route.js";
import { activityRouter } from "./src/routes/activity.route.js";
 
const app = express();
app.use(express.json());
app.use(cors());
 

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 
app.use('/todo-items', todoRouter);
app.use('/activity-groups', activityRouter);
 

app.listen(process.env.MYSQL_PORT, () => console.log(`Server running at http://localhost:${process.env.MYSQL_PORT}`));