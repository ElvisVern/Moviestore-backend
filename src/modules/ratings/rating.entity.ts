import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { IRatingDtoOptions, RatingDto } from './dtos/rating.dto';

@Entity({ name: 'movie_ratings' })
@UseDto(RatingDto)
export class RatingEntity extends AbstractEntity<
  RatingDto,
  IRatingDtoOptions
> {
  @Column('bigint', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('bigint', {
    nullable: false,
    name: 'movie_id',
  })
  movieId: string;

  @Column('decimal', {
    nullable: false,
    name: 'rating',
  })
  rating: number;

  @Column('bigint', {
    nullable: false,
    name: 'version',
  })
  version: number;
}
