import { Module } from '@nestjs/common';
import { StoryController } from './controller/story.controller';
import { StoryService } from './service/story.service';

@Module({
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
