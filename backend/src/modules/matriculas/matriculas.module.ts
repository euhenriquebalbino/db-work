import { Module } from '@nestjs/common';
import { MatriculasController } from './matriculas.controller';
import { MatriculasRepository } from './matriculas.repository';
import { MatriculasService } from './matriculas.service';
@Module({ controllers: [MatriculasController], providers: [MatriculasService, MatriculasRepository] })
export class MatriculasModule {}
