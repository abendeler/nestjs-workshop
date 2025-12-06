import { DynamicModule, Module } from '@nestjs/common';
import { FileSystemDb } from './file-system-db';
import { InMemoryStorage } from './in-memory-storage';
import { TasksRepository } from 'src/types';
import { ConfigService } from '@nestjs/config';
import {
  fileSystemDbOptionsProvider,
  JSON_DB_CONFIG,
} from './file-system-db-options-provider';
import { Config } from 'node-json-db';
import { DbProvider } from 'src/types/enums';

type DBProvider = 'FileSystemDb' | 'InMemoryStorage';

export interface StorageModuleOptions {
  dbProvider: DBProvider;
}

export interface StorageModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<StorageModuleOptions> | StorageModuleOptions;
  inject?: any[];
  imports?: any[];
}

@Module({})
export class StorageModule {
  static registerAsync(): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: JSON_DB_CONFIG,
          useFactory: fileSystemDbOptionsProvider,
          inject: [ConfigService],
        },
        {
          provide: TasksRepository,
          useFactory: (configService: ConfigService, jsonDbConfig: Config) => {
            const dbProvider =
              configService.getOrThrow<DbProvider>('DB_PROVIDER');
            switch (dbProvider) {
              case DbProvider.FileSystemDb:
                return new FileSystemDb(jsonDbConfig);
              case DbProvider.InMemoryStorage:
                return new InMemoryStorage();
              default:
                throw new Error(`unexpectedValue.DB_PROVIDER: ${dbProvider}`);
            }
          },
          inject: [ConfigService, JSON_DB_CONFIG],
        },
      ],
      exports: [TasksRepository],
    };
  }
}
