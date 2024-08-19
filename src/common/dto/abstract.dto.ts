import { ApiProperty } from '@nestjs/swagger';

import DateUtil from '../../shared/date';
import type { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = DateUtil.fromTimestampToString(entity.createdAt);
      this.updatedAt = DateUtil.fromTimestampToString(entity.updatedAt);
    }
  }
}
