import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { FilterStoryDto } from '../dto/filter-story.dto';

export interface Story {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class StoryService {
  private stories: Story[] = [];
  private idCounter = 1;
  constructor(private readonly prisma: PrismaService) {}

  create(createStoryDto: CreateStoryDto): Story {
    const newStory = { id: this.idCounter++, ...createStoryDto };
    this.stories.push(newStory);
    return newStory;
  }

  findAll(filter: FilterStoryDto): Story[] {
    let filteredStories = this.stories;

    if (filter.title) {
      filteredStories = filteredStories.filter((story) =>
        story.title.toLowerCase().includes(filter.title?.toLowerCase() ?? ''),
      );
    }

    if (filter.sortBy) {
      filteredStories.sort((a, b) => {
        const order = filter.order === 'asc' ? 1 : -1;
        const sortKey = filter.sortBy as keyof Story;
        return a[sortKey] > b[sortKey] ? order : -order;
      });
    }

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredStories.slice(start, end);
  }

  findOne(id: number): Story | undefined {
    return this.stories.find((story) => story.id === id);
  }

  update(id: number, updateStoryDto: CreateStoryDto): Story | undefined {
    const storyIndex = this.stories.findIndex((story) => story.id === id);
    if (storyIndex === -1) {
      return undefined;
    }
    const updatedStory = { ...this.stories[storyIndex], ...updateStoryDto };
    this.stories[storyIndex] = updatedStory;
    return updatedStory;
  }

  remove(id: number): boolean {
    const storyIndex = this.stories.findIndex((story) => story.id === id);
    if (storyIndex === -1) {
      return false;
    }
    this.stories.splice(storyIndex, 1);
    return true;
  }
}
