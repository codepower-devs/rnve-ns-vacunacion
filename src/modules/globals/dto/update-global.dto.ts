import { PartialType } from '@nestjs/swagger';
import { CreateGlobalDto } from './create-global.dto';

export class UpdateGlobalDto extends PartialType(CreateGlobalDto) {}
