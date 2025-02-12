import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

(() => {
  const logger = new Logger('bootstrap');
  NestFactory.create(AppModule)
    .then((app) => app.listen(3000))
    .then(() => {
      logger.log(`server listening on port 3000`);
    })
    .catch((e) => {
      logger.error(`server failed to start`, e);
      process.exit(1);
    });
})();
