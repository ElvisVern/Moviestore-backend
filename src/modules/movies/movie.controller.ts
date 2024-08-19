import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { ApiPageOkResponse, Auth } from '../../decorators';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieRatingDto } from './dtos/update-movie-rating.dto';
import { MovieService } from './movie.service';
import { MovieDto } from './dtos/movie';
import { MoviePageOptionsDto } from './dtos/movie-page-options.dto';
import { UpdateMovieDto } from './dtos/update-movie-dto';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  // @Post()
  // @Auth([])
  // @HttpCode(HttpStatus.CREATED)
  // async createMovie(@Body() createMovieDto: CreateMovieDto) {
  //   const entity = await this.movieService.createMovie(createMovieDto);

  //   return entity.toDto();
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get movie list',
    type: PageDto<MovieDto>,
  })
  getMovies(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: MoviePageOptionsDto,
  ): Promise<PageDto<MovieDto>> {
    return this.movieService.getMovies(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleMovie(@Param('id') id: string): Promise<MovieDto> {
    const entity = await this.movieService.getSingleMovie(id);

    return entity;
  }

  @Patch(':id/rating')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateMovieRating(
    @Param('id') id: string,
    @Body() updateMovieRatingDto: UpdateMovieRatingDto,
  ): Promise<boolean> {
    await this.movieService.updateMovieRating(id, updateMovieRatingDto);
    return true;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<void> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteMovie(@Param('id') id: string): Promise<void> {
    await this.movieService.deleteMovie(id);
  }
}
