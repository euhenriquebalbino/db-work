import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateProfessorDto } from "./dto/create-professor.dto";
import { UpdateProfessorDto } from "./dto/update-professor.dto";

@Injectable()
export class ProfessoresRepository {
  constructor(private readonly db: DatabaseService) {}
  create(dto: CreateProfessorDto) {
    return this.db.executeProcedure("sp_professores_create", dto);
  }
  findAll(search = "", page = 1, pageSize = 10) {
    return this.db.executeProcedure("sp_professores_list", {
      search,
      page,
      pageSize,
    });
  }
  findOne(id: number) {
    return this.db.executeProcedure("sp_professores_get_by_id", { id });
  }
  update(id: number, dto: UpdateProfessorDto) {
    return this.db.executeProcedure("sp_professores_update", { id, ...dto });
  }
  remove(id: number) {
    return this.db.executeProcedure("sp_professores_delete", { id });
  }
}
