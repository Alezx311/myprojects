import { Controller } from '@nestjs/common';

import { TextService } from './text.service';
import { TextConstants } from './music.constants';

@Controller('text')
export class TextController {
  constructor(private readonly textService = TextService, private readonly textConstants = TextConstants) {}

  @Get('melody/generate')
  async createMelodyFromParams(
    @Response() res: Response
  ) {
    const 
  }
  @Get('melody/chroma')
  async createMelodyFromChroma(
    @Response() res: Response
  ) {
    const 
  }
}
