import { ConfigService } from '@nestjs/config';
import { Config } from 'node-json-db';
import * as path from 'path';

export const JSON_DB_CONFIG = 'JSON_DB_CONFIG';

export const fileSystemDbOptionsProvider = (
  configService: ConfigService,
): Config => {
  const dbFilePath = configService.getOrThrow<string>('DB_FILE_PATH');
  const saveOnPush = true;
  const humanReadable = false;
  const pathToFile = path.resolve(__dirname, dbFilePath);

  return new Config(pathToFile, saveOnPush, humanReadable, '/');
};
