/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class MiddlewaresMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware executed');
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    console.log('Request Body:', req.body);
    console.log('Request Headers:', req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpException(
        'Authorization token is missing',
        HttpStatus.FORBIDDEN,
      );
    }
    if (token === '123456') {
      next();
    } else {
      throw new HttpException(
        'Authorization token is invalid',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
