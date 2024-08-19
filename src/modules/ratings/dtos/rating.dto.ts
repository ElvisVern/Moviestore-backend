import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { RatingEntity } from '../rating.entity';

export interface IRatingDtoOptions { }

export class RatingDto extends AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  version: number;

  constructor(entityName: RatingEntity, options?: IRatingDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.movieId = entityName.movieId;
    this.rating = entityName.rating;
    this.version = entityName.version;
  }
}
