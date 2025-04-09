"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.js (Integrating NestJS into Express)
const express_1 = __importDefault(require("express"));
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const nest_module_1 = require("./nestjs/nest.module"); // Import the NestJS module
const app = (0, express_1.default)();
const port = 3000;
// Existing Express route
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});
// Existing Express API route
app.get("/api/data", (req, res) => {
    res.json({ message: "Data from Express API" });
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const nestApp = yield core_1.NestFactory.create(nest_module_1.NestModule, new platform_express_1.ExpressAdapter(app));
        nestApp.setGlobalPrefix("api"); // Optional: add a global prefix for NestJS routes
        yield nestApp.init(); // Initialize the NestJS app inside the Express app
    });
}
bootstrap();
// Start the Express app
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
