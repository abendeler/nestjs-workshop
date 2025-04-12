import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

(() => {
  NestFactory.create(AppModule)
    .then((app) => app.listen(3000))
    .then(() => {
      const logger = new Logger('Bootstrap');
      logger.log(`server listening on port 3000`);
    })
    .catch((e) => {
      console.log(e);
    });
})();
