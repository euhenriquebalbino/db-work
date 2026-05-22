import { IsInt } from "class-validator";
export class CreateMatriculaDto {
  @IsInt() aluno_id!: number;
  @IsInt() disciplina_id!: number;
}
