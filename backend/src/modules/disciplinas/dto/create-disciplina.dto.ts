import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateDisciplinaDto {
  @IsString() @IsNotEmpty() nome!: string;
  @IsInt() @Min(1) carga_horaria!: number;
  @IsInt() professor_id!: number;
}
