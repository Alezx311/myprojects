import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MelodyModule } from './melody/melody.module';
import { BlissController } from './bliss/bliss.controller';
import { BlissService } from './bliss/bliss.service';
import { BlissModule } from './bliss/bliss.module';
import { SamplesModule } from './samples/samples.module';

@Module({
  imports: [MelodyModule, BlissModule, SamplesModule],
  controllers: [AppController, BlissController],
  providers: [AppService, BlissService],
})
export class AppModule {}
