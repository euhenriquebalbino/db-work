import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateMatriculaDto } from "./dto/create-matricula.dto";
import { UpdateMatriculaDto } from "./dto/update-matricula.dto";
@Injectable()
export class MatriculasRepository {
  constructor(private readonly db: DatabaseService) {}
  create(dto: CreateMatriculaDto) {
    return this.db.executeProcedure("sp_matriculas_create", dto);
  }
  findAll(search = "", page = 1, pageSize = 10) {
    return this.db.executeProcedure("sp_matriculas_list", {
      search,
      page,
      pageSize,
    });
  }
  findOne(id: number) {
    return this.db.executeProcedure("sp_matriculas_get_by_id", { id });
  }
  update(id: number, dto: UpdateMatriculaDto) {
    return this.db.executeProcedure("sp_matriculas_update", { id, ...dto });
  }
  remove(id: number) {
    return this.db.executeProcedure("sp_matriculas_delete", { id });
  }
}
