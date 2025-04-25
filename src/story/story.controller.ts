import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { FilterStoryDto } from './dto/filter-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story, StoryService } from './story.service';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @Get()
  findAll(@Query() filter: FilterStoryDto) {
    return this.storyService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Story | undefined {
    return this.storyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ): Story | undefined {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
