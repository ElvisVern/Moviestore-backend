import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { MovieEntity } from '../movie.entity';

export interface IMovieDtoOptions {
  rating: number;
}

export class MovieDto extends AbstractDto {

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  releaseDate: number;

  @ApiPropertyOptional()
  rating?: number;

  constructor(entityName: MovieEntity, options?: IMovieDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.title = entityName.title;
    this.poster = entityName.poster;
    this.genre = entityName.genre;
    this.releaseDate = entityName.releaseDate;
    this.rating = entityName.rating;
  }
}
