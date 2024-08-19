import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IMovieDtoOptions } from './dtos/movie';
import { MovieDto } from './dtos/movie';

@Entity({ name: 'movies' })
@UseDto(MovieDto)
export class MovieEntity extends AbstractEntity<MovieDto, IMovieDtoOptions> {

  @Column('varchar', {
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column('varchar', {
    nullable: false,
    name: 'poster',
  })
  poster: string;

  @Column('varchar', {
    nullable: false,
    name: 'genre',
  })
  genre: string;

  @Column('int', {
    nullable: false,
    name: 'release_date',
  })
  releaseDate: number;

  rating: number;
}
