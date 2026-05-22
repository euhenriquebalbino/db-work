import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfessoresRepository } from "./professores.repository";
import { CreateProfessorDto } from "./dto/create-professor.dto";
import { UpdateProfessorDto } from "./dto/update-professor.dto";

@Injectable()
export class ProfessoresService {
  constructor(private readonly repo: ProfessoresRepository) {}
  create(dto: CreateProfessorDto) {
    return this.repo.create(dto);
  }
  findAll(search?: string, page?: number, pageSize?: number) {
    return this.repo.findAll(search, page, pageSize);
  }
  async findOne(id: number) {
    const [item] = await this.repo.findOne(id);
    if (!item) throw new NotFoundException("Professor nao encontrado");
    return item;
  }
  update(id: number, dto: UpdateProfessorDto) {
    return this.repo.update(id, dto);
  }
  remove(id: number) {
    return this.repo.remove(id);
  }
}
