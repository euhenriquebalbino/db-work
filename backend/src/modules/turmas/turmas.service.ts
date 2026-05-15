import { Injectable, NotFoundException } from '@nestjs/common';
import { TurmasRepository } from './turmas.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
@Injectable()
export class TurmasService {
  constructor(private readonly repo: TurmasRepository) {}
  create(dto: CreateTurmaDto) { return this.repo.create(dto); }
  findAll(search?: string, page?: number, pageSize?: number) { return this.repo.findAll(search, page, pageSize); }
  async findOne(id: number) { const [item] = await this.repo.findOne(id); if (!item) throw new NotFoundException('Turma nao encontrada'); return item; }
  update(id: number, dto: UpdateTurmaDto) { return this.repo.update(id, dto); }
  remove(id: number) { return this.repo.remove(id); }
}
