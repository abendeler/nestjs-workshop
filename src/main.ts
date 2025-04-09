// app.js (Integrating NestJS into Express)
import express, { Request, Response } from "express";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { NestModule } from "./nestjs/nest.module"; // Import the NestJS module

const app = express();
const port = 3000;

// Existing Express route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express!");
});

// Existing Express API route
app.get("/api/data", (req: Request, res: Response) => {
  res.json({ message: "Data from Express API" });
});

async function bootstrap() {
  const nestApp = await NestFactory.create(NestModule, new ExpressAdapter(app));
  nestApp.setGlobalPrefix("api"); // Optional: add a global prefix for NestJS routes
  await nestApp.init(); // Initialize the NestJS app inside the Express app
}

bootstrap();

// Start the Express app
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
