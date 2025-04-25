import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, StoryModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
