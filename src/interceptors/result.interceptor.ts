/**
 * 响应结果拦截器
 */

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result = null) => {
        const baseResponse: BaseResponse = {
          statusCode: HttpStatus.OK,
          data: result,
        };

        return baseResponse;
      }),
    );
  }
}

export class BaseResponse {
  statusCode: number;

  data?: any = {};

  error?: any = {};

  errorCode?: string | number;

  errorMsg?: string | string[];
}
