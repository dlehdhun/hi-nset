import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty({
    required: true,
    type: Number,
    description: '영화 ID',
    example: 1,
    default: 'ID 없음',
  })
  id: number;

  @ApiProperty({
    required: true,
    type: String,
    description: '영화 제목',
    example: 'movie1',
    default: '제목 없음',
  })
  title: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '영화 년도',
    example: 2025,
    default: '년도 없음',
  })
  year: number;

  @ApiProperty({
    required: true,
    type: String,
    description: '영화 주제',
    example: 'hahaha',
    default: '주제 없음',
  })
  genres: string | null;
}
