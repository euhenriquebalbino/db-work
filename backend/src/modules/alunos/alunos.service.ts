import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAlunoDto } from "./dto/create-aluno.dto";
import { UpdateAlunoDto } from "./dto/update-aluno.dto";
import { AlunosRepository } from "./alunos.repository";

@Injectable()
export class AlunosService {
  constructor(private readonly repository: AlunosRepository) {}

  create(dto: CreateAlunoDto) {
    return this.repository.create(dto);
  }
  findAll(search?: string, page?: number, pageSize?: number) {
    return this.repository.findAll(search, page, pageSize);
  }
  async findOne(id: number) {
    const [aluno] = await this.repository.findOne(id);
    if (!aluno) throw new NotFoundException("Aluno nao encontrado");
    return aluno;
  }
  update(id: number, dto: UpdateAlunoDto) {
    return this.repository.update(id, dto);
  }
  remove(id: number) {
    return this.repository.remove(id);
  }
}
