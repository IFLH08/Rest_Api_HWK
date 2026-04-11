import "dotenv/config"
import express from 'express';
import morgan from 'morgan';
import indexRoutes from "./routes/index.routes.js"
import usersRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"
import { connectDB } from './utils/db.js';

connectDB()

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(indexRoutes)
app.use(loginRoutes)
app.use(usersRoutes)

const PORT = 8000;

app.listen(PORT,console.log("http://localhost:"+PORT))