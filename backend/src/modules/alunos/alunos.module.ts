import { Module } from "@nestjs/common";
import { AlunosController } from "./alunos.controller";
import { AlunosRepository } from "./alunos.repository";
import { AlunosService } from "./alunos.service";

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunosRepository],
})
export class AlunosModule {}
