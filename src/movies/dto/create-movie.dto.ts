import { ApiProperty } from '@nestjs/swagger';
import { isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '영화 제목',
    example: 'movie1',
    default: '제목 없음',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '영화 년도',
    example: '2025',
    default: 0,
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    required: true,
    type: String,
    description: '영화 주제',
    example: 'hahaha',
    default: '주제 없음',
  })
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string;
}
