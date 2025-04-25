import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './controller/user.controller';
import { AccessMiddleware } from './middlewares/access/access.middleware';
import { MiddlewaresMiddleware } from './middlewares/middlewares.middleware';
import { UserService } from './service/user.service';
@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewaresMiddleware)
      .forRoutes(UserController)
      .apply(AccessMiddleware)
      .forRoutes(UserController);
  }
}
