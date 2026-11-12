import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TakController } from './tak/tak.controller';
import { TakService } from './tak/tak.service';
import { TakModule } from './tak/tak.module';
import { PatrouilleController } from './patrouille/patrouille.controller';
import { PatrouilleService } from './patrouille/patrouille.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DrizzleModule,
    TakModule,
  ],
  controllers: [HealthController, PatrouilleController],
  providers: [PatrouilleService],
})
export class AppModule {}
