import { Controller } from '@nestjs/common';

import { TextService } from './text.service';
import { TextConstants } from './text.constants';

@Controller('text')
export class TextController {
  constructor(private readonly textService = TextService, private readonly textConstants = TextConstants) {}

  @Get()
}
