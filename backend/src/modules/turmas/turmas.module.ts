import { Module } from "@nestjs/common";
import { TurmasController } from "./turmas.controller";
import { TurmasRepository } from "./turmas.repository";
import { TurmasService } from "./turmas.service";
@Module({
  controllers: [TurmasController],
  providers: [TurmasService, TurmasRepository],
})
export class TurmasModule {}
