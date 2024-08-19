import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RatingService } from './rating.service';
import type { RatingDto } from './dtos/rating.dto';
import { UpdateRatingDto } from './dtos/update-rating.dto';
import { CreateRatingDto } from './dtos/create-rating.dto';

@Controller('ratings')
@ApiTags('ratings')
export class RatingController {
  constructor(private ratingService: RatingService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    await this.ratingService.createRating(createRatingDto);
    return true;
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  getRatingByMovieIds(
    @Body() getRatingByMovieIdsDto: { movieIds: string[] },
  ): Promise<RatingDto[]> {
    return this.ratingService.getRatingByMovieIds(getRatingByMovieIdsDto.movieIds);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateRating(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<void> {
    return this.ratingService.updateRating(id, updateRatingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteRating(@Param('id') id: string): Promise<void> {
    await this.ratingService.deleteRating(id);
  }
}
