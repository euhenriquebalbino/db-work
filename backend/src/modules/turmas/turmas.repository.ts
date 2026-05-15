import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
@Injectable()
export class TurmasRepository {
  constructor(private readonly db: DatabaseService) {}
  create(dto: CreateTurmaDto) { return this.db.executeProcedure('sp_turmas_create', dto); }
  findAll(search = '', page = 1, pageSize = 10) { return this.db.executeProcedure('sp_turmas_list', { search, page, pageSize }); }
  findOne(id: number) { return this.db.executeProcedure('sp_turmas_get_by_id', { id }); }
  update(id: number, dto: UpdateTurmaDto) { return this.db.executeProcedure('sp_turmas_update', { id, ...dto }); }
  remove(id: number) { return this.db.executeProcedure('sp_turmas_delete', { id }); }
}
