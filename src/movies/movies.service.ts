import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma.service';
import { movies } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<movies[]> {
    return this.prismaService.movies.findMany();
  }

  async getOne(id: number): Promise<movies> {
    const movie = await this.prismaService.movies.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException('영화를 찾을 수 없습니다.');
    return movie;
  }

  async deleteOne(id: number): Promise<movies> {
    const movie = await this.prismaService.movies.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException('영화를 찾을 수 없습니다.');

    return this.prismaService.movies.delete({
      where: { id },
    });
  }

  async create(movieData: CreateMovieDto): Promise<movies> {
    return this.prismaService.movies.create({
      data: {
        title: movieData.title,
        year: movieData.year,
        genres: movieData.genres,
      },
    });
  }

  async update(id: number, updateData: UpdateMovieDto): Promise<movies> {
    const movie = await this.prismaService.movies.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException('영화를 찾을 수 없습니다.');

    return this.prismaService.movies.update({
      where: { id },
      data: {
        title: updateData.title,
        year: updateData.year,
        genres: updateData.genres,
      },
    });
  }
}
