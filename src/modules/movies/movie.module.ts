import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { RatingModule } from '../ratings/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), RatingModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule { }
