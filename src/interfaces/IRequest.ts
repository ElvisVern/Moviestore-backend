export interface IRequest {
  url: string;
  header?: Record<K, V>;
  json?: boolean;
  mime?: string;
  proxy?: boolean;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  data?: Record<string, string | any> | string;
  body?: any;
  buffer?: Buffer;
  timeout?: number;
}
