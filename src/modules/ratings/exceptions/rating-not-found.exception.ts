import { NotFoundException } from '@nestjs/common';

export class RatingNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.ratingNotFound', error);
  }
}
