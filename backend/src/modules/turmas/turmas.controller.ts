import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
@ApiTags('turmas')
@Controller('turmas')
export class TurmasController {
  constructor(private readonly service: TurmasService) {}
  @Post() create(@Body() dto: CreateTurmaDto) { return this.service.create(dto); }
  @Get() findAll(@Query('search') search = '', @Query('page') page = '1', @Query('pageSize') pageSize = '10') { return this.service.findAll(search, Number(page), Number(pageSize)); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTurmaDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
