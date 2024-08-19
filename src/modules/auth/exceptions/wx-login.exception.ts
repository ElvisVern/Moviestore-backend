import { BadRequestException } from '@nestjs/common';

export class AuthWxLoginException extends BadRequestException {
  constructor() {
    super('error.loginError');
  }
}
