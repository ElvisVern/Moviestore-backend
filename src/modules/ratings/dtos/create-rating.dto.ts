import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {

  @IsNotEmpty()
  @IsString()
  movieId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

}
