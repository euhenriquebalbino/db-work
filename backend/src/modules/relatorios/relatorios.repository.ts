import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class RelatoriosRepository {
  constructor(private readonly db: DatabaseService) {}
  mediaPorAlunoDisciplina() { return this.db.executeProcedure('sp_rel_media_por_aluno_disciplina'); }
  notasTurmaDisciplina(turma_id: number, disciplina_id: number) { return this.db.executeProcedure('sp_rel_notas_turma_disciplina', { turma_id, disciplina_id }); }
  alunosPorTurma(turma_id: number) { return this.db.executeProcedure('sp_rel_alunos_por_turma', { turma_id }); }
  aprovados() { return this.db.executeProcedure('sp_rel_alunos_aprovados'); }
  reprovados() { return this.db.executeProcedure('sp_rel_alunos_reprovados'); }
  disciplinasPorProfessor(professor_id: number) { return this.db.executeProcedure('sp_rel_disciplinas_por_professor', { professor_id }); }
  ranking() { return this.db.executeProcedure('sp_rel_ranking_melhores_medias'); }
  quantidadeAlunosPorTurma() { return this.db.executeProcedure('sp_rel_quantidade_alunos_por_turma'); }
  mediaGeralEscola() { return this.db.executeProcedure('sp_rel_media_geral_escola'); }
  historicoAluno(aluno_id: number) { return this.db.executeProcedure('sp_rel_historico_escolar_aluno', { aluno_id }); }
}
