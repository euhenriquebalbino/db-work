import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplinasRepository } from './disciplinas.repository';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
@Injectable()
export class DisciplinasService {
  constructor(private readonly repo: DisciplinasRepository) {}
  create(dto: CreateDisciplinaDto) { return this.repo.create(dto); }
  findAll(search?: string, page?: number, pageSize?: number) { return this.repo.findAll(search, page, pageSize); }
  async findOne(id: number) { const [item] = await this.repo.findOne(id); if (!item) throw new NotFoundException('Disciplina nao encontrada'); return item; }
  update(id: number, dto: UpdateDisciplinaDto) { return this.repo.update(id, dto); }
  remove(id: number) { return this.repo.remove(id); }
}
