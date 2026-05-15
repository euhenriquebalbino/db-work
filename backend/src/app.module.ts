import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlunosModule } from './modules/alunos/alunos.module';
import { ProfessoresModule } from './modules/professores/professores.module';
import { TurmasModule } from './modules/turmas/turmas.module';
import { DisciplinasModule } from './modules/disciplinas/disciplinas.module';
import { MatriculasModule } from './modules/matriculas/matriculas.module';
import { NotasModule } from './modules/notas/notas.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AlunosModule,
    ProfessoresModule,
    TurmasModule,
    DisciplinasModule,
    MatriculasModule,
    NotasModule,
    RelatoriosModule
  ]
})
export class AppModule {}
