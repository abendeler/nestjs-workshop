import { Module } from "@nestjs/common";
import { NestController } from "./nest.controller.js";

@Module({
  controllers: [NestController],
})
export class NestModule {}
