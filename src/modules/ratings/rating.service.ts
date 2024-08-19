import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from './rating.entity';
import type { RatingDto } from './dtos/rating.dto';
import type { UpdateRatingDto } from './dtos/update-rating.dto';
import { RatingNotFoundException } from './exceptions/rating-not-found.exception';
import { CreateRatingDto } from './dtos/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    // @ts-ignore
    @InjectRepository(RatingEntity)
    private ratingRepository: Repository<RatingEntity>,
  ) { }

  async getRating(movieId: string): Promise<RatingDto | undefined> {
    const items = await this.ratingRepository.findOneBy({ movieId: movieId });
    return items?.toDto();
  }

  async createRating(createRatingDto: CreateRatingDto): Promise<RatingDto> {
    const ratingEntity = this.ratingRepository.create(createRatingDto);
    await this.ratingRepository.save(ratingEntity);
    return ratingEntity.toDto();
  }

  async getRatingByMovieIds(movieIds: string[]): Promise<RatingDto[]> {
    const queryBuilder = this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.movie_id IN (:movieIds)', { movieIds });

    return await queryBuilder.getMany();
  }

  async updateRatingByMovieId(
    movieId: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<void> {
    const queryBuilder = this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.movie_id = :movieId', { movieId });

    let ratingEntity = await queryBuilder.getOne();
    if (!ratingEntity) {
      ratingEntity = new RatingEntity();
      ratingEntity.movieId = movieId;
      ratingEntity.rating = updateRatingDto.rating;
    } else {
      ratingEntity.rating = +ratingEntity.rating + updateRatingDto.rating;
      ratingEntity.version = +ratingEntity.version + 1
    }
    await this.ratingRepository.save(ratingEntity);
  }

  async updateRating(
    id: string,
    updateRatingDto: UpdateRatingDto,
  ): Promise<void> {
    const queryBuilder = this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.id = :id', { id });

    const RatingEntity = await queryBuilder.getOne();

    if (!RatingEntity) {
      throw new RatingNotFoundException();
    }

    this.ratingRepository.merge(RatingEntity, updateRatingDto);
    await this.ratingRepository.save(updateRatingDto);
  }

  async deleteRating(id: string): Promise<void> {
    const queryBuilder = this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.id = :id', { id });

    const RatingEntity = await queryBuilder.getOne();

    if (!RatingEntity) {
      throw new RatingNotFoundException();
    }

    await this.ratingRepository.remove(RatingEntity);
  }
}
