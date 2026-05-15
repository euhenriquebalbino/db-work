import { Injectable, NotFoundException } from '@nestjs/common';
import { MatriculasRepository } from './matriculas.repository';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
@Injectable()
export class MatriculasService {
  constructor(private readonly repo: MatriculasRepository) {}
  create(dto: CreateMatriculaDto) { return this.repo.create(dto); }
  findAll(search?: string, page?: number, pageSize?: number) { return this.repo.findAll(search, page, pageSize); }
  async findOne(id: number) { const [item] = await this.repo.findOne(id); if (!item) throw new NotFoundException('Matricula nao encontrada'); return item; }
  update(id: number, dto: UpdateMatriculaDto) { return this.repo.update(id, dto); }
  remove(id: number) { return this.repo.remove(id); }
}
