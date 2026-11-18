import { Module } from '@nestjs/common';
import { PatrouilleController } from './patrouille.controller';
import { PatrouilleService } from './patrouille.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [PatrouilleController],
  providers: [PatrouilleService]
})
export class PatrouilleModule {}
