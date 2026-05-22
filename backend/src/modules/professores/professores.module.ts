import { Module } from "@nestjs/common";
import { ProfessoresController } from "./professores.controller";
import { ProfessoresRepository } from "./professores.repository";
import { ProfessoresService } from "./professores.service";
@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService, ProfessoresRepository],
})
export class ProfessoresModule {}
