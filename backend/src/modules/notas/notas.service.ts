import { Injectable, NotFoundException } from "@nestjs/common";
import { NotasRepository } from "./notas.repository";
import { CreateNotaDto } from "./dto/create-nota.dto";
import { UpdateNotaDto } from "./dto/update-nota.dto";
@Injectable()
export class NotasService {
  constructor(private readonly repo: NotasRepository) {}
  create(dto: CreateNotaDto) {
    return this.repo.create(dto);
  }
  findAll(search?: string, page?: number, pageSize?: number) {
    return this.repo.findAll(search, page, pageSize);
  }
  async findOne(id: number) {
    const [item] = await this.repo.findOne(id);
    if (!item) throw new NotFoundException("Nota nao encontrada");
    return item;
  }
  update(id: number, dto: UpdateNotaDto) {
    return this.repo.update(id, dto);
  }
  remove(id: number) {
    return this.repo.remove(id);
  }
  byAluno(alunoId: number) {
    return this.repo.byAluno(alunoId);
  }
  byTurma(turmaId: number) {
    return this.repo.byTurma(turmaId);
  }
}
