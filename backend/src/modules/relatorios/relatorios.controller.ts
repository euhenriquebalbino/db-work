import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service';
@ApiTags('relatorios')
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly service: RelatoriosService) {}
  @Get('media-por-aluno-disciplina') mediaPorAlunoDisciplina() { return this.service.mediaPorAlunoDisciplina(); }
  @Get('notas-turma-disciplina') notasTurmaDisciplina(@Query('turmaId') turmaId: string, @Query('disciplinaId') disciplinaId: string) { return this.service.notasTurmaDisciplina(Number(turmaId), Number(disciplinaId)); }
  @Get('alunos-por-turma/:turmaId') alunosPorTurma(@Param('turmaId', ParseIntPipe) turmaId: number) { return this.service.alunosPorTurma(turmaId); }
  @Get('aprovados') aprovados() { return this.service.aprovados(); }
  @Get('reprovados') reprovados() { return this.service.reprovados(); }
  @Get('disciplinas-por-professor/:professorId') disciplinasPorProfessor(@Param('professorId', ParseIntPipe) professorId: number) { return this.service.disciplinasPorProfessor(professorId); }
  @Get('ranking') ranking() { return this.service.ranking(); }
  @Get('quantidade-alunos-por-turma') quantidadeAlunosPorTurma() { return this.service.quantidadeAlunosPorTurma(); }
  @Get('media-geral-escola') mediaGeralEscola() { return this.service.mediaGeralEscola(); }
  @Get('historico/:alunoId') historicoAluno(@Param('alunoId', ParseIntPipe) alunoId: number) { return this.service.historicoAluno(alunoId); }
}
