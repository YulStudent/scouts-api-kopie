import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import path from 'node:path';
import {
  type DatabaseProvider,
  DrizzleAsyncProvider,
  drizzleProvider,
  InjectDrizzle,
} from './drizzle.provider';

@Module({
  providers: [drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule implements OnModuleDestroy {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}
  async onModuleInit() {
    await migrate(this.db, { migrationsFolder: path.resolve('migrations') });
  }
  
  async onModuleDestroy() {
    await this.db.$client.end();
  }
}
