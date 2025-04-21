import express from "express";
import cors from "cors";

import taskRoutes from "./routes/taskRoute";
import noteRoutes from "./routes/noteRoute";

const app = express();

app.use(cors());

app.use(express.json());

app.use(taskRoutes);
app.use(noteRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
