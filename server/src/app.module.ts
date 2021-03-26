import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MelodyModule } from './melody/melody.module';
import { BlissController } from './bliss/bliss.controller';
import { BlissService } from './bliss/bliss.service';
import { BlissModule } from './bliss/bliss.module';
import { SamplesModule } from './samples/samples.module';
import { TextController } from './text/text.controller';
import { TextService } from './text/text.service';
import { TextModule } from './text/text.module';
import { CreatorController } from './creator/creator.controller';
import { CreatorService } from './creator/creator.service';
import { CreatorModule } from './creator/creator.module';

@Module({
  imports: [MelodyModule, BlissModule, SamplesModule, TextModule, CreatorModule],
  controllers: [AppController, BlissController, TextController, CreatorController],
  providers: [AppService, BlissService, TextService, CreatorService],
})
export class AppModule {}
