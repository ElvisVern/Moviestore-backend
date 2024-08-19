import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieEntity } from './movie.entity';
import type { MovieDto } from './dtos/movie';
import { CreateMovieDto } from './dtos/create-movie.dto';
import type { UpdateMovieRatingDto } from './dtos/update-movie-rating.dto';
import { MovieNotFoundException } from './exceptions/movie-not-found.exception';
import { MoviePageOptionsDto } from './dtos/movie-page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { RatingService } from '../ratings/rating.service';
import { UpdateMovieDto } from './dtos/update-movie-dto';

@Injectable()
export class MovieService {
  constructor(
    // @ts-ignore
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    private ratingService: RatingService,
  ) { }

  async getMovies(
    pageOptionsDto: MoviePageOptionsDto
  ): Promise<PageDto<MovieDto>> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    if (pageOptionsDto.q) {
      // use *% to search avoid index failure
      queryBuilder.andWhere('movie.title LIKE :search', {
        search: `${pageOptionsDto.q}%`,
      });
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (!items.length) {
      return items.toPageDto(pageMetaDto);
    }
    // batch search for ratings to reduce number of DB queries
    const ratings = await this.ratingService.getRatingByMovieIds(items.map(item => item.id));
    items.forEach((item) => {
      ratings.forEach((rating) => {
        if (rating.movieId === item.id) {
          item.rating = +(+rating.rating / +rating.version || 1).toFixed(1) || 0.0;
        }
      })
    })
    return items.toPageDto(pageMetaDto);
  }

  async getSingleMovie(id: string): Promise<MovieEntity> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id });

    const movieEntity = await queryBuilder.getOne();

    if (!movieEntity) {
      throw new MovieNotFoundException();
    }

    const rating = await this.ratingService.getRating(id);
    if (!rating) {
      movieEntity.rating = 0.0;
    } else {
      movieEntity.rating = +(+rating.rating / +rating.version || 1).toFixed(1) || 0.0;
    }
    return movieEntity;
  }

  async updateMovieRating(
    id: string,
    updateMovieRatingDto: UpdateMovieRatingDto,
  ): Promise<void> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id });

    const movie = await queryBuilder.getOne();
    if (!movie) {
      throw new MovieNotFoundException();
    }
    await this.ratingService.updateRatingByMovieId(id, updateMovieRatingDto);
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<void> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id });

    const MovieEntity = await queryBuilder.getOne();

    if (!MovieEntity) {
      throw new MovieNotFoundException();
    }

    this.movieRepository.merge(MovieEntity, updateMovieDto);

    await this.movieRepository.save(updateMovieDto);
  }

  async deleteMovie(id: string): Promise<void> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id });

    const MovieEntity = await queryBuilder.getOne();

    if (!MovieEntity) {
      throw new MovieNotFoundException();
    }

    await this.movieRepository.remove(MovieEntity);
  }
}
