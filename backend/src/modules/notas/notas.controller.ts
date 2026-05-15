import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
@ApiTags('notas')
@Controller('notas')
export class NotasController {
  constructor(private readonly service: NotasService) {}
  @Post() create(@Body() dto: CreateNotaDto) { return this.service.create(dto); }
  @Get() findAll(@Query('search') search = '', @Query('page') page = '1', @Query('pageSize') pageSize = '10') { return this.service.findAll(search, Number(page), Number(pageSize)); }
  @Get('aluno/:alunoId') byAluno(@Param('alunoId', ParseIntPipe) alunoId: number) { return this.service.byAluno(alunoId); }
  @Get('turma/:turmaId') byTurma(@Param('turmaId', ParseIntPipe) turmaId: number) { return this.service.byTurma(turmaId); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNotaDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
