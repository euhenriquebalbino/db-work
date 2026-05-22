import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateAlunoDto } from "./dto/create-aluno.dto";
import { UpdateAlunoDto } from "./dto/update-aluno.dto";
import { Aluno } from "./interfaces/aluno.interface";

@Injectable()
export class AlunosRepository {
  constructor(private readonly db: DatabaseService) {}

  create(dto: CreateAlunoDto) {
    return this.db.executeProcedure<Aluno>("sp_alunos_create", dto);
  }
  findAll(search = "", page = 1, pageSize = 10) {
    return this.db.executeProcedure<Aluno>("sp_alunos_list", {
      search,
      page,
      pageSize,
    });
  }
  findOne(id: number) {
    return this.db.executeProcedure<Aluno>("sp_alunos_get_by_id", { id });
  }
  update(id: number, dto: UpdateAlunoDto) {
    return this.db.executeProcedure<Aluno>("sp_alunos_update", { id, ...dto });
  }
  remove(id: number) {
    return this.db.executeProcedure("sp_alunos_delete", { id });
  }
}
