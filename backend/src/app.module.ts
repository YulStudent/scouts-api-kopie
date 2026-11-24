import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TakController } from './tak/tak.controller';
import { TakService } from './tak/tak.service';
import { TakModule } from './tak/tak.module';
import { GebruikerModule } from './gebruiker/gebruiker.module';
import { MedischeFicheModule } from './medische-fiche/medische-fiche.module';
import { TotemModule } from './totem/totem.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DrizzleModule,
    TakModule,
    GebruikerModule,
    MedischeFicheModule,
    TotemModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
