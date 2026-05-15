import { Injectable } from '@nestjs/common';
import { RelatoriosRepository } from './relatorios.repository';
@Injectable()
export class RelatoriosService {
  constructor(private readonly repo: RelatoriosRepository) {}
  mediaPorAlunoDisciplina() { return this.repo.mediaPorAlunoDisciplina(); }
  notasTurmaDisciplina(turmaId: number, disciplinaId: number) { return this.repo.notasTurmaDisciplina(turmaId, disciplinaId); }
  alunosPorTurma(turmaId: number) { return this.repo.alunosPorTurma(turmaId); }
  aprovados() { return this.repo.aprovados(); }
  reprovados() { return this.repo.reprovados(); }
  disciplinasPorProfessor(professorId: number) { return this.repo.disciplinasPorProfessor(professorId); }
  ranking() { return this.repo.ranking(); }
  quantidadeAlunosPorTurma() { return this.repo.quantidadeAlunosPorTurma(); }
  mediaGeralEscola() { return this.repo.mediaGeralEscola(); }
  historicoAluno(alunoId: number) { return this.repo.historicoAluno(alunoId); }
}
