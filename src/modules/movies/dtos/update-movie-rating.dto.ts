import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UpdateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
