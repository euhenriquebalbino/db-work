import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateDisciplinaDto } from "./dto/create-disciplina.dto";
import { UpdateDisciplinaDto } from "./dto/update-disciplina.dto";
@Injectable()
export class DisciplinasRepository {
  constructor(private readonly db: DatabaseService) {}
  create(dto: CreateDisciplinaDto) {
    return this.db.executeProcedure("sp_disciplinas_create", dto);
  }
  findAll(search = "", page = 1, pageSize = 10) {
    return this.db.executeProcedure("sp_disciplinas_list", {
      search,
      page,
      pageSize,
    });
  }
  findOne(id: number) {
    return this.db.executeProcedure("sp_disciplinas_get_by_id", { id });
  }
  update(id: number, dto: UpdateDisciplinaDto) {
    return this.db.executeProcedure("sp_disciplinas_update", { id, ...dto });
  }
  remove(id: number) {
    return this.db.executeProcedure("sp_disciplinas_delete", { id });
  }
}
