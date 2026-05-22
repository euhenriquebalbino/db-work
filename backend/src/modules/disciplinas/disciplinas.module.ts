import { Module } from "@nestjs/common";
import { DisciplinasController } from "./disciplinas.controller";
import { DisciplinasRepository } from "./disciplinas.repository";
import { DisciplinasService } from "./disciplinas.service";
@Module({
  controllers: [DisciplinasController],
  providers: [DisciplinasService, DisciplinasRepository],
})
export class DisciplinasModule {}
