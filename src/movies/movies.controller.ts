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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Movie } from './entites/movie.entity';
import { ResponseDto } from './dto/response.dto';
import { GenericApiResponse } from './decorators/generic-api-response-decorator';

@ApiTags('movie')
@Controller('movies')
@ApiExtraModels(ResponseDto, Movie)
// @ApiBearerAuth()
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  // @ApiOkResponse({
  //   description: '영화 다 가져오기 성공',
  //   type: Movie,
  //   isArray: true,
  // })
  @ApiOperation({
    summary: '영화 다 가져오기',
    description: '# 영화 다 가져오기',
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://docs.nestjs.com/',
    },
  })
  @GenericApiResponse(Movie, {
    isArray: true,
    description: '영화 다 가져오기 성공',
    messageExample: '영화 다 가져오기',
  })
  async getAll() {
    const movieList = await this.MoviesService.getAll();
    return {
      message: '영화 다 가져오기',
      statusCode: 200,
      data: movieList,
    };
  }

  @Get('/:id')
  @GenericApiResponse(Movie, {
    isArray: false,
    description: '영화 하나 가져오기 성공',
    messageExample: '영화 하나 가져오기',
  })
  @ApiOperation({
    summary: '영화 하나 가져오기',
    description: '# 영화 하나 가져오기',
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://docs.nestjs.com/',
    },
  })
  async getOne(@Param('id') movieId: number) {
    const movies = await this.MoviesService.getOne(movieId);

    return {
      message: '영화 하나 가져오기',
      statusCode: '200',
      data: movies,
    };
  }

  @Post()
  @GenericApiResponse(Movie, {
    isArray: false,
    description: '영화 추가 성공',
    messageExample: '영화 추가 성공',
  })
  @ApiOperation({
    summary: '영화 추가',
    description: `# 영화 추가
    영화 추가는 하나씩 해주세요`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://docs.nestjs.com/',
    },
  })
  async create(@Body() movieData: CreateMovieDto) {
    const createmoive = await this.MoviesService.create(movieData);
    return {
      message: '영화 추가 성공',
      statusCode: '201',
      data: createmoive,
    };
  }

  @Delete('/:id')
  @GenericApiResponse(Movie, {
    isArray: false,
    description: '영화 삭제 성공',
  })
  @ApiOperation({
    summary: '영화 삭제',
    description: `# 영화 삭제
    영화 삭제는 하나씩 해주세요`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://docs.nestjs.com/',
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') movieId: number) {
    await this.MoviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  @GenericApiResponse(Movie, {
    isArray: false,
    description: '영화 업데이트 성공',
    messageExample: '영화 변경 성공',
  })
  @ApiOperation({
    summary: '영화 업데이트',
    description: `# 영화 업데이트
    영화 업데이트는 하나씩 해주세요`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://docs.nestjs.com/',
    },
  })
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
