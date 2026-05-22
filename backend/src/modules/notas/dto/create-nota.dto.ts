import { IsInt, IsNumber, Max, Min } from "class-validator";
export class CreateNotaDto {
  @IsInt() matricula_id!: number;
  @IsNumber() @Min(0) @Max(10) nota1!: number;
  @IsNumber() @Min(0) @Max(10) nota2!: number;
  @IsNumber() @Min(0) @Max(10) nota3!: number;
}
