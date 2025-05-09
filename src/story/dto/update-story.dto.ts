import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
