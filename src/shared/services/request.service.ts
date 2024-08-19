import { Injectable } from '@nestjs/common';
import type { IRequest } from 'interfaces/IRequest';
import request from 'request';

import { jsonParse } from '../../common/utils';

@Injectable()
export class RequestService {
  constructor() {}

  public async requests(param: IRequest): Promise<any> {
    let {
      url,
      json = true,
      header,
      method = 'GET',
      mime,
      timeout = 10_000,
      data,
      buffer,
    } = param;
    const pobj = {
      url,
      method,
      headers: { Connection: 'keep-alive' },
      form: {} || undefined,
      formData: {} || undefined,
      body: {} || undefined,
      proxy: undefined,
      encoding: undefined,
      timeout: 10,
      rejectUnauthorized: false,
      tunnel: false,
    };

    if (method == 'POST' || method == 'PUT') {
      json && !mime && (mime = 'application/json');
      !mime && (mime = 'application/x-www-form-urlencoded');
      pobj.headers['Content-Type'] = mime;

      if (data) {
        if (mime.includes('urlencoded')) {
          pobj.form = data;
        } else if (mime.includes('form-data')) {
          pobj.formData = data;
        } else {
          pobj.body = data;
        }
      }
    }

    if (header) {
      for (const p in header) {
        pobj.headers[p] = header[p];
      }
    }

    buffer && (pobj.encoding = undefined);
    pobj.timeout = timeout;

    buffer && (pobj.encoding = undefined);

    return new Promise((resolve, reject) => {
      request(pobj, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          body = body?.toString();
          body = typeof body == 'string' && json ? jsonParse(body) : body;
          resolve && resolve(body);
        } else {
          error = error?.toString() || response.body?.toString();
          reject && reject(error);
        }
      });
    });
  }
}
