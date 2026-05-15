import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
@Injectable()
export class NotasRepository {
  constructor(private readonly db: DatabaseService) {}
  create(dto: CreateNotaDto) { return this.db.executeProcedure('sp_notas_create', dto); }
  findAll(search = '', page = 1, pageSize = 10) { return this.db.executeProcedure('sp_notas_list', { search, page, pageSize }); }
  findOne(id: number) { return this.db.executeProcedure('sp_notas_get_by_id', { id }); }
  update(id: number, dto: UpdateNotaDto) {
    const { nota1, nota2, nota3 } = dto;
    return this.db.executeProcedure('sp_notas_update', { id, nota1, nota2, nota3 });
  }
  remove(id: number) { return this.db.executeProcedure('sp_notas_delete', { id }); }
  byAluno(aluno_id: number) { return this.db.executeProcedure('sp_notas_por_aluno', { aluno_id }); }
  byTurma(turma_id: number) { return this.db.executeProcedure('sp_notas_por_turma', { turma_id }); }
}
