// nestjs/nest.controller.ts
import { Controller, Get } from "@nestjs/common";

@Controller("nest")
export class NestController {
  @Get()
  getNestData() {
    return { message: "Data from NestJS!" };
  }
}
