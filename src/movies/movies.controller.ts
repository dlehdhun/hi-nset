import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  async getAll() {
    const movieList = await this.MoviesService.getAll();
    return {
      message: '영화 다 가져오기',
      statusCode: '200',
      data: movieList,
    };
  }

  @Get('/:id')
  async getOne(@Param('id') movieId: number) {
    const movies = await this.MoviesService.getOne(movieId);

    return {
      message: '영화 하나 가져오기',
      statusCode: '200',
      data: movies,
    };
  }

  @Post()
  async create(@Body() movieData: CreateMovieDto) {
    const createmoive = await this.MoviesService.create(movieData);
    return {
      message: '영화 추가 성공',
      statusCode: '201',
      data: createmoive,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') movieId: number) {
    await this.MoviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    const patchmoive = await this.MoviesService.update(movieId, updateData);
    return {
      message: '영화 변경 성공',
      statusCode: '200',
      data: patchmoive,
    };
  }
}
